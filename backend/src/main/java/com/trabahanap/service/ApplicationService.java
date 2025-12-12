package com.trabahanap.service;

import com.trabahanap.dto.response.ApplicationDTO;
import com.trabahanap.exception.BadRequestException;
import com.trabahanap.exception.DuplicateResourceException;
import com.trabahanap.exception.ForbiddenException;
import com.trabahanap.exception.ResourceNotFoundException;
import com.trabahanap.mapper.ApplicationMapper;
import com.trabahanap.model.Job;
import com.trabahanap.model.JobApplication;
import com.trabahanap.model.JobApplication.ApplicationStatus;
import com.trabahanap.model.User;
import com.trabahanap.repository.JobApplicationRepository;
import com.trabahanap.repository.JobRepository;
import com.trabahanap.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service layer for job application operations.
 */
@Service
public class ApplicationService {

    @Autowired
    private JobApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileStorageService fileStorageService;

    /**
     * Apply for a job.
     */
    @Transactional
    public ApplicationDTO applyForJob(Long userId, Long jobId, String coverLetterText,
            MultipartFile coverLetterPdf, MultipartFile resumePdf) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", jobId));

        // Check if already applied (using existing method)
        if (applicationRepository.existsByJobIdAndApplicantId(jobId, userId)) {
            throw new DuplicateResourceException("You have already applied for this job");
        }

        // Create application
        JobApplication application = new JobApplication();
        application.setApplicant(user);
        application.setJob(job);
        application.setCoverLetterText(coverLetterText);
        application.setStatus(ApplicationStatus.PENDING);
        application.setAppliedAt(LocalDateTime.now());

        // Handle file uploads
        if (coverLetterPdf != null && !coverLetterPdf.isEmpty()) {
            String coverLetterPath = fileStorageService.storeFile(coverLetterPdf, "cover-letters");
            application.setCoverLetterPath(coverLetterPath);
        }

        if (resumePdf != null && !resumePdf.isEmpty()) {
            String resumePath = fileStorageService.storeFile(resumePdf, "resumes");
            application.setResumePath(resumePath);
        }

        JobApplication savedApplication = applicationRepository.save(application);
        return ApplicationMapper.toDTO(savedApplication);
    }

    /**
     * Get applications for a job seeker.
     */
    @Transactional(readOnly = true)
    public List<ApplicationDTO> getMyApplications(Long userId) {
        List<JobApplication> applications = applicationRepository.findByApplicantIdWithDetails(userId);
        return ApplicationMapper.toDTOList(applications);
    }

    /**
     * Check if user has applied for a job.
     */
    public boolean hasApplied(Long userId, Long jobId) {
        return applicationRepository.existsByJobIdAndApplicantId(jobId, userId);
    }

    /**
     * Get applications for employer's jobs.
     */
    @Transactional(readOnly = true)
    public List<ApplicationDTO> getEmployerApplications(Long employerId) {
        List<JobApplication> applications = applicationRepository.findByEmployerIdWithDetails(employerId);
        return ApplicationMapper.toDTOList(applications);
    }

    /**
     * Update application status (employer only).
     */
    @Transactional
    public ApplicationDTO updateApplicationStatus(Long employerId, Long applicationId, String newStatus) {
        JobApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application", "id", applicationId));

        // Verify employer owns the job
        if (!application.getJob().getPostedBy().getId().equals(employerId)) {
            throw new ForbiddenException("You can only update applications for your own job postings");
        }

        // Parse and set status
        try {
            ApplicationStatus status = ApplicationStatus.valueOf(newStatus.toUpperCase());
            application.setStatus(status);
            application.setUpdatedAt(LocalDateTime.now());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid status: " + newStatus);
        }

        JobApplication updatedApplication = applicationRepository.save(application);
        return ApplicationMapper.toDTO(updatedApplication);
    }

    /**
     * Get application by ID.
     */
    @Transactional(readOnly = true)
    public ApplicationDTO getApplicationById(Long applicationId) {
        JobApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application", "id", applicationId));
        return ApplicationMapper.toDTO(application);
    }
}
