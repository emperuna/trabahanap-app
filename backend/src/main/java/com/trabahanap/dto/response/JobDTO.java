package com.trabahanap.dto.response;

import com.trabahanap.model.Job;
import java.time.LocalDateTime;

/**
 * Response DTO for job listing.
 */
public class JobDTO {

    private Long id;
    private String title;
    private String company;
    private String location;
    private String jobType;
    private String description;
    private String requirements;
    private Double salary;
    private String postedByUsername;
    private LocalDateTime createdAt;

    public JobDTO() {
    }

    public static JobDTO fromJob(Job job) {
        JobDTO dto = new JobDTO();
        dto.setId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setCompany(job.getCompany());
        dto.setLocation(job.getLocation());
        dto.setJobType(job.getJobType());
        dto.setDescription(job.getDescription());
        dto.setRequirements(job.getRequirements());
        dto.setSalary(job.getSalary());
        dto.setCreatedAt(job.getCreatedAt());

        if (job.getPostedBy() != null) {
            dto.setPostedByUsername(job.getPostedBy().getUsername());
        }

        return dto;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getPostedByUsername() {
        return postedByUsername;
    }

    public void setPostedByUsername(String postedByUsername) {
        this.postedByUsername = postedByUsername;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
