package com.trabahanap.dto.response;

/**
 * Response DTO for employer job statistics.
 */
public class JobStatsDTO {

    private int totalJobs;
    private int activeJobs;
    private int closedJobs;
    private int totalApplications;
    private int pendingApplications;
    private int acceptedApplications;
    private int rejectedApplications;

    // Constructors
    public JobStatsDTO() {
    }

    public JobStatsDTO(int totalJobs, int activeJobs, int closedJobs,
            int totalApplications, int pendingApplications,
            int acceptedApplications, int rejectedApplications) {
        this.totalJobs = totalJobs;
        this.activeJobs = activeJobs;
        this.closedJobs = closedJobs;
        this.totalApplications = totalApplications;
        this.pendingApplications = pendingApplications;
        this.acceptedApplications = acceptedApplications;
        this.rejectedApplications = rejectedApplications;
    }

    // Getters and Setters
    public int getTotalJobs() {
        return totalJobs;
    }

    public void setTotalJobs(int totalJobs) {
        this.totalJobs = totalJobs;
    }

    public int getActiveJobs() {
        return activeJobs;
    }

    public void setActiveJobs(int activeJobs) {
        this.activeJobs = activeJobs;
    }

    public int getClosedJobs() {
        return closedJobs;
    }

    public void setClosedJobs(int closedJobs) {
        this.closedJobs = closedJobs;
    }

    public int getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(int totalApplications) {
        this.totalApplications = totalApplications;
    }

    public int getPendingApplications() {
        return pendingApplications;
    }

    public void setPendingApplications(int pendingApplications) {
        this.pendingApplications = pendingApplications;
    }

    public int getAcceptedApplications() {
        return acceptedApplications;
    }

    public void setAcceptedApplications(int acceptedApplications) {
        this.acceptedApplications = acceptedApplications;
    }

    public int getRejectedApplications() {
        return rejectedApplications;
    }

    public void setRejectedApplications(int rejectedApplications) {
        this.rejectedApplications = rejectedApplications;
    }
}
