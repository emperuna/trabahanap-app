package com.trabahanap.dto;

import java.time.LocalDateTime;

import com.trabahanap.model.UserResume;

public class UserResumeDTO {
    
    private Long id;
    private String fileName;
    private Long fileSize;
    private Boolean isDefault;
    private LocalDateTime uploadedAt;
    private String viewUrl;
    private String downloadUrl;
    
    // Constructors
    public UserResumeDTO() {
    }
    
    public UserResumeDTO(Long id, String fileName, Long fileSize, Boolean isDefault,
                         LocalDateTime uploadedAt, String viewUrl, String downloadUrl) {
        this.id = id;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.isDefault = isDefault;
        this.uploadedAt = uploadedAt;
        this.viewUrl = viewUrl;
        this.downloadUrl = downloadUrl;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getFileName() {
        return fileName;
    }
    
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    
    public Long getFileSize() {
        return fileSize;
    }
    
    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }
    
    public Boolean getIsDefault() {
        return isDefault;
    }
    
    public void setIsDefault(Boolean isDefault) {
        this.isDefault = isDefault;
    }
    
    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }
    
    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }
    
    public String getViewUrl() {
        return viewUrl;
    }
    
    public void setViewUrl(String viewUrl) {
        this.viewUrl = viewUrl;
    }
    
    public String getDownloadUrl() {
        return downloadUrl;
    }
    
    public void setDownloadUrl(String downloadUrl) {
        this.downloadUrl = downloadUrl;
    }
    
    // Convert entity to DTO
    public static UserResumeDTO fromEntity(UserResume resume) {
        UserResumeDTO dto = new UserResumeDTO();
        dto.setId(resume.getId());
        dto.setFileName(resume.getFileName());
        dto.setFileSize(resume.getFileSize());
        dto.setIsDefault(resume.getIsDefault());
        dto.setUploadedAt(resume.getUploadedAt());
        dto.setViewUrl("/api/users/resume/" + resume.getId() + "/view");
        dto.setDownloadUrl("/api/users/resume/" + resume.getId() + "/download");
        return dto;
    }
}
