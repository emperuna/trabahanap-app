package com.trabahanap.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.trabahanap.dto.response.UserResumeDTO;
import com.trabahanap.exception.ResourceNotFoundException;
import com.trabahanap.model.User;
import com.trabahanap.model.UserResume;
import com.trabahanap.repository.UserRepository;
import com.trabahanap.repository.UserResumeRepository;

@Service
public class UserResumeService {

    private final UserResumeRepository userResumeRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public UserResumeService(UserResumeRepository userResumeRepository,
            UserRepository userRepository,
            FileStorageService fileStorageService) {
        this.userResumeRepository = userResumeRepository;
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }

    /**
     * Upload a new resume for user
     */
    @Transactional
    public UserResumeDTO uploadResume(Long userId, MultipartFile file) {
        // Validate user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Validate file
        validateResumeFile(file);

        // Store file in uploads/resumes/user_{userId}/
        String subDirectory = "resumes/user_" + userId;
        String filePath = fileStorageService.storeFile(file, subDirectory);

        // Create UserResume entity
        UserResume resume = new UserResume();
        resume.setUser(user);
        resume.setFileName(file.getOriginalFilename());
        resume.setFilePath(filePath);
        resume.setFileSize(file.getSize());

        // If this is user's first resume, set as default
        boolean hasResumes = userResumeRepository.existsByUserId(userId);
        resume.setIsDefault(!hasResumes);

        // Save to database
        UserResume savedResume = userResumeRepository.save(resume);

        return UserResumeDTO.fromEntity(savedResume);
    }

    /**
     * Get all resumes for a user
     */
    public List<UserResumeDTO> getUserResumes(Long userId) {
        List<UserResume> resumes = userResumeRepository.findByUserIdOrderByUploadedAtDesc(userId);
        return resumes.stream()
                .map(UserResumeDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get a specific resume (with security check)
     */
    public UserResume getResume(Long resumeId, Long userId) {
        return userResumeRepository.findByIdAndUserId(resumeId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));
    }

    /**
     * Get default resume for user
     */
    public UserResumeDTO getDefaultResume(Long userId) {
        UserResume resume = userResumeRepository.findByUserIdAndIsDefaultTrue(userId)
                .orElseThrow(() -> new ResourceNotFoundException("No default resume found"));
        return UserResumeDTO.fromEntity(resume);
    }

    /**
     * Set a resume as default
     */
    @Transactional
    public UserResumeDTO setDefaultResume(Long resumeId, Long userId) {
        // Verify ownership
        UserResume resume = getResume(resumeId, userId);

        // Remove default flag from all user's resumes
        userResumeRepository.removeDefaultFlagFromAllResumes(userId);

        // Set this resume as default
        resume.setIsDefault(true);
        UserResume updated = userResumeRepository.save(resume);

        return UserResumeDTO.fromEntity(updated);
    }

    /**
     * Delete a resume
     */
    @Transactional
    public void deleteResume(Long resumeId, Long userId) {
        // Verify ownership
        UserResume resume = getResume(resumeId, userId);

        // Delete file from storage (local or R2)
        fileStorageService.deleteFile(resume.getFilePath());

        // Delete from database
        userResumeRepository.delete(resume);

        // If deleted resume was default, set another resume as default
        if (resume.getIsDefault()) {
            List<UserResume> remainingResumes = userResumeRepository.findByUserIdOrderByUploadedAtDesc(userId);

            if (!remainingResumes.isEmpty()) {
                UserResume newDefault = remainingResumes.get(0);
                newDefault.setIsDefault(true);
                userResumeRepository.save(newDefault);
            }
        }
    }

    /**
     * View resume file
     */
    public Resource viewResume(Long resumeId, Long userId) {
        UserResume resume = getResume(resumeId, userId);
        return fileStorageService.loadFileAsResource(resume.getFilePath());
    }

    /**
     * Download resume file
     */
    public Resource downloadResume(Long resumeId, Long userId) {
        return viewResume(resumeId, userId);
    }

    /**
     * Get resume count for user
     */
    public long getResumeCount(Long userId) {
        return userResumeRepository.countByUserId(userId);
    }

    /**
     * Validate resume file
     */
    private void validateResumeFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        // Check file size (max 10MB)
        long maxSize = 10 * 1024 * 1024; // 10MB
        if (file.getSize() > maxSize) {
            throw new IllegalArgumentException("File size exceeds maximum limit (10MB)");
        }

        // Check file type
        String contentType = file.getContentType();
        if (contentType == null || !contentType.equals("application/pdf")) {
            throw new IllegalArgumentException("Only PDF files are allowed");
        }

        // Check file extension
        String fileName = file.getOriginalFilename();
        if (fileName == null || !fileName.toLowerCase().endsWith(".pdf")) {
            throw new IllegalArgumentException("File must have .pdf extension");
        }
    }
}
