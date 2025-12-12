package com.trabahanap.service;

import com.trabahanap.dto.response.JobDTO;
import com.trabahanap.exception.DuplicateResourceException;
import com.trabahanap.exception.ResourceNotFoundException;
import com.trabahanap.mapper.JobMapper;
import com.trabahanap.model.Job;
import com.trabahanap.model.SavedJob;
import com.trabahanap.model.User;
import com.trabahanap.repository.JobRepository;
import com.trabahanap.repository.SavedJobRepository;
import com.trabahanap.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service layer for saved job operations.
 */
@Service
public class SavedJobService {

    @Autowired
    private SavedJobRepository savedJobRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Save a job for a user.
     */
    @Transactional
    public void saveJob(Long userId, Long jobId) {
        // Check if already saved
        if (savedJobRepository.existsByUserIdAndJobId(userId, jobId)) {
            throw new DuplicateResourceException("Job is already saved");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", jobId));

        SavedJob savedJob = new SavedJob(user, job);
        savedJobRepository.save(savedJob);
    }

    /**
     * Remove a saved job.
     */
    @Transactional
    public void removeSavedJob(Long userId, Long jobId) {
        savedJobRepository.deleteByUserIdAndJobId(userId, jobId);
    }

    /**
     * Get all saved jobs for a user.
     */
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getMySavedJobs(Long userId) {
        List<SavedJob> savedJobs = savedJobRepository.findByUserIdWithJobDetails(userId);

        return savedJobs.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Check if a job is saved by user.
     */
    public boolean isJobSaved(Long userId, Long jobId) {
        return savedJobRepository.existsByUserIdAndJobId(userId, jobId);
    }

    /**
     * Get saved jobs count for user.
     */
    public long getSavedJobsCount(Long userId) {
        return savedJobRepository.countByUserId(userId);
    }

    /**
     * Convert SavedJob to DTO map.
     */
    private Map<String, Object> convertToDTO(SavedJob savedJob) {
        Map<String, Object> dto = new HashMap<>();
        Job job = savedJob.getJob();

        dto.put("id", savedJob.getId());
        dto.put("savedAt", savedJob.getSavedAt());

        // Job details
        Map<String, Object> jobDetails = new HashMap<>();
        jobDetails.put("id", job.getId());
        jobDetails.put("title", job.getTitle());
        jobDetails.put("company", job.getCompany());
        jobDetails.put("location", job.getLocation());
        jobDetails.put("jobType", job.getJobType());
        jobDetails.put("description", job.getDescription());
        jobDetails.put("requirements", job.getRequirements());
        jobDetails.put("salary", job.getSalary());
        if (job.getPostedBy() != null) {
            jobDetails.put("postedBy", job.getPostedBy().getUsername());
        }

        dto.put("job", jobDetails);

        return dto;
    }
}
