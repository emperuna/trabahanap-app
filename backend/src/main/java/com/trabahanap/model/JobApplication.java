package com.trabahanap.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_applications")
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_id", nullable = false)
    private User applicant;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.PENDING;

    //New fields for cover letter and resume
    @Column(name = "cover_letter_path")
    private String coverLetterPath; // Path to PDF file

    @Column(name = "resume_path")
    private String resumePath; // Path to PDF file

    @Column(name = "cover_letter_text", length = 2000)
    private String coverLetterText; // Keep text for preview/search

    //Current fields
    @Column(name = "applied_at")
    private LocalDateTime appliedAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Constructors
    public JobApplication() {}

    public JobApplication(Job job, User applicant, String coverLetter) {
        this.job = job;
        this.applicant = applicant;
        this.coverLetterPath = coverLetterPath;
        this.resumePath = resumePath;
        this.coverLetterText = coverLetterText;
        this.appliedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }

    public User getApplicant() { return applicant; }
    public void setApplicant(User applicant) { this.applicant = applicant; }

    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }

    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Add getters and setters for new fields
    public String getCoverLetterPath() { return coverLetterPath; }
    public void setCoverLetterPath(String coverLetterPath) { this.coverLetterPath = coverLetterPath; }

    public String getResumePath() { return resumePath; }
    public void setResumePath(String resumePath) { this.resumePath = resumePath; }

    public String getCoverLetterText() { return coverLetterText; }
    public void setCoverLetterText(String coverLetterText) { this.coverLetterText = coverLetterText; }

    public enum ApplicationStatus {
        PENDING,
        REVIEWED,
        ACCEPTED,
        REJECTED
    }
}