package com.trabahanap.mapper;

import com.trabahanap.dto.response.JobDTO;
import com.trabahanap.dto.response.JobDetailDTO;
import com.trabahanap.dto.request.JobCreateRequest;
import com.trabahanap.model.Job;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper for Job entity to DTO conversions.
 */
public class JobMapper {

    private JobMapper() {
        // Prevent instantiation
    }

    /**
     * Convert Job entity to JobDTO.
     */
    public static JobDTO toDTO(Job job) {
        return JobDTO.fromJob(job);
    }

    /**
     * Convert list of Job entities to list of JobDTOs.
     */
    public static List<JobDTO> toDTOList(List<Job> jobs) {
        return jobs.stream()
                .map(JobMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert Job entity to JobDetailDTO.
     */
    public static JobDetailDTO toDetailDTO(Job job) {
        return JobDetailDTO.fromJob(job);
    }

    /**
     * Convert JobCreateRequest to Job entity.
     */
    public static Job toEntity(JobCreateRequest request) {
        Job job = new Job();
        job.setTitle(request.getTitle());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setJobType(request.getJobType());
        job.setDescription(request.getDescription());
        job.setRequirements(request.getRequirements());
        if (request.getSalary() != null) {
            try {
                job.setSalary(Double.parseDouble(request.getSalary()));
            } catch (NumberFormatException e) {
                // If salary can't be parsed, set to null
                job.setSalary(null);
            }
        }
        return job;
    }
}
