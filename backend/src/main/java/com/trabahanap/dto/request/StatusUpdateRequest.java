package com.trabahanap.dto.request;

import jakarta.validation.constraints.NotBlank;

/**
 * Request DTO for updating application status.
 */
public class StatusUpdateRequest {

    @NotBlank(message = "Status is required")
    private String status;

    private String notes;

    // Constructors
    public StatusUpdateRequest() {
    }

    public StatusUpdateRequest(String status) {
        this.status = status;
    }

    public StatusUpdateRequest(String status, String notes) {
        this.status = status;
        this.notes = notes;
    }

    // Getters and Setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
