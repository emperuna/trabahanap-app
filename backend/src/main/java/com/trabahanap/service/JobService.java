package com.trabahanap.service;

import com.trabahanap.dto.request.JobCreateRequest;
import com.trabahanap.dto.request.JobUpdateRequest;
import com.trabahanap.dto.response.JobDTO;
import com.trabahanap.dto.response.JobDetailDTO;
import com.trabahanap.dto.response.JobStatsDTO;
import com.trabahanap.exception.ForbiddenException;
import com.trabahanap.exception.ResourceNotFoundException;
import com.trabahanap.mapper.JobMapper;
import com.trabahanap.model.Job;
import com.trabahanap.model.User;
import com.trabahanap.repository.JobApplicationRepository;
import com.trabahanap.repository.JobRepository;
import com.trabahanap.repository.UserRepository;
import com.trabahanap.security.AuthorizationHelper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service layer for job-related operations.
 */
@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobApplicationRepository applicationRepository;

    /**
     * Get all jobs.
     */
    @Transactional(readOnly = true)
    public List<JobDTO> getAllJobs() {
        List<Job> jobs = jobRepository.findAll();
        return JobMapper.toDTOList(jobs);
    }

    /**
     * Get job by ID.
     */
    @Transactional(readOnly = true)
    public JobDTO getJobById(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", jobId));

        // Force initialization of lazy-loaded properties
        if (job.getPostedBy() != null) {
            job.getPostedBy().getUsername();
        }

        return JobMapper.toDTO(job);
    }

    /**
     * Get jobs posted by a specific employer.
     */
    @Transactional(readOnly = true)
    public List<JobDTO> getEmployerJobs(Long employerId) {
        List<Job> jobs = jobRepository.findJobsByEmployerId(employerId);
        return JobMapper.toDTOList(jobs);
    }

    /**
     * Create a new job posting.
     */
    @Transactional
    public JobDTO createJob(Long userId, JobCreateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        AuthorizationHelper.requireEmployer(user);

        Job job = JobMapper.toEntity(request);
        job.setPostedBy(user);

        Job savedJob = jobRepository.save(job);
        return JobMapper.toDTO(savedJob);
    }

    /**
     * Update an existing job.
     */
    @Transactional
    public JobDTO updateJob(Long userId, Long jobId, JobUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", jobId));

        // Verify ownership
        if (!job.getPostedBy().getId().equals(userId)) {
            throw new ForbiddenException("You can only edit your own job postings");
        }

        // Update fields if provided
        if (request.getTitle() != null)
            job.setTitle(request.getTitle());
        if (request.getCompany() != null)
            job.setCompany(request.getCompany());
        if (request.getLocation() != null)
            job.setLocation(request.getLocation());
        if (request.getJobType() != null)
            job.setJobType(request.getJobType());
        if (request.getDescription() != null)
            job.setDescription(request.getDescription());
        if (request.getRequirements() != null)
            job.setRequirements(request.getRequirements());
        if (request.getSalary() != null) {
            try {
                job.setSalary(Double.parseDouble(request.getSalary()));
            } catch (NumberFormatException e) {
                // Ignore invalid salary
            }
        }

        Job updatedJob = jobRepository.save(job);
        return JobMapper.toDTO(updatedJob);
    }

    /**
     * Delete a job posting.
     */
    @Transactional
    public void deleteJob(Long userId, Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", jobId));

        // Verify ownership
        if (!job.getPostedBy().getId().equals(userId)) {
            throw new ForbiddenException("You can only delete your own job postings");
        }

        // Delete the job (cascade should handle applications if configured)
        jobRepository.delete(job);
    }

    /**
     * Get job statistics for an employer.
     */
    @Transactional(readOnly = true)
    public JobStatsDTO getJobStats(Long employerId) {
        List<Job> jobs = jobRepository.findJobsByEmployerId(employerId);

        int totalJobs = jobs.size();
        int activeJobs = (int) jobs.stream().filter(j -> !"CLOSED".equals(j.getJobType())).count();
        int closedJobs = totalJobs - activeJobs;

        long totalApplications = 0;
        for (Job job : jobs) {
            totalApplications += applicationRepository.countByJobId(job.getId());
        }

        return new JobStatsDTO(
                totalJobs, activeJobs, closedJobs,
                (int) totalApplications, 0, 0, 0);
    }

    /**
     * Get recent jobs for an employer (limited).
     */
    @Transactional(readOnly = true)
    public List<JobDTO> getRecentEmployerJobs(Long employerId, int limit) {
        List<Job> jobs = jobRepository.findJobsByEmployerId(employerId);
        return jobs.stream()
                .limit(limit)
                .map(JobMapper::toDTO)
                .toList();
    }
}
