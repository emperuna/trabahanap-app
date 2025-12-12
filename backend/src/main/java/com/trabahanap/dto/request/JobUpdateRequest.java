package com.trabahanap.dto.request;

import jakarta.validation.constraints.Size;

/**
 * Request DTO for updating a job posting.
 * All fields are optional - only provided fields will be updated.
 */
public class JobUpdateRequest {

    @Size(max = 200, message = "Title must be less than 200 characters")
    private String title;

    @Size(max = 200, message = "Company name must be less than 200 characters")
    private String company;

    private String location;

    private String jobType;

    private String description;

    private String requirements;

    private String salary;

    private String status;

    // Constructors
    public JobUpdateRequest() {
    }

    // Getters and Setters
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

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
