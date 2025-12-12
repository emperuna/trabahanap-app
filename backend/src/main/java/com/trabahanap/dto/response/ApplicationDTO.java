package com.trabahanap.dto.response;

import com.trabahanap.model.JobApplication;
import java.time.LocalDateTime;

/**
 * Response DTO for job applications.
 */
public class ApplicationDTO {

    private Long id;
    private Long jobId;
    private String jobTitle;
    private String company;
    private String applicantUsername;
    private String applicantEmail;
    private String status;
    private String coverLetter;
    private String coverLetterPath;
    private String resumePath;
    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;

    public ApplicationDTO() {
    }

    public static ApplicationDTO fromApplication(JobApplication application) {
        ApplicationDTO dto = new ApplicationDTO();
        dto.setId(application.getId());
        dto.setStatus(application.getStatus().toString());
        dto.setCoverLetter(application.getCoverLetterText());
        dto.setCoverLetterPath(application.getCoverLetterPath());
        dto.setResumePath(application.getResumePath());
        dto.setAppliedAt(application.getAppliedAt());
        dto.setUpdatedAt(application.getUpdatedAt());

        if (application.getJob() != null) {
            dto.setJobId(application.getJob().getId());
            dto.setJobTitle(application.getJob().getTitle());
            dto.setCompany(application.getJob().getCompany());
        }

        if (application.getApplicant() != null) {
            dto.setApplicantUsername(application.getApplicant().getUsername());
            dto.setApplicantEmail(application.getApplicant().getEmail());
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

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getApplicantUsername() {
        return applicantUsername;
    }

    public void setApplicantUsername(String applicantUsername) {
        this.applicantUsername = applicantUsername;
    }

    public String getApplicantEmail() {
        return applicantEmail;
    }

    public void setApplicantEmail(String applicantEmail) {
        this.applicantEmail = applicantEmail;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCoverLetter() {
        return coverLetter;
    }

    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }

    public String getCoverLetterPath() {
        return coverLetterPath;
    }

    public void setCoverLetterPath(String coverLetterPath) {
        this.coverLetterPath = coverLetterPath;
    }

    public String getResumePath() {
        return resumePath;
    }

    public void setResumePath(String resumePath) {
        this.resumePath = resumePath;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(LocalDateTime appliedAt) {
        this.appliedAt = appliedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
