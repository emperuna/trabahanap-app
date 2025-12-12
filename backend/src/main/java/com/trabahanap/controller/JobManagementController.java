package com.trabahanap.controller;

import com.trabahanap.dto.request.JobUpdateRequest;
import com.trabahanap.dto.response.JobDTO;
import com.trabahanap.dto.response.JobStatsDTO;
import com.trabahanap.dto.response.MessageResponse;
import com.trabahanap.service.JobService;
import com.trabahanap.security.UserPrincipal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

/**
 * Controller for employer job management endpoints.
 * Delegates business logic to JobService.
 */
@RestController
@RequestMapping("/api/employer/jobs")
@CrossOrigin(origins = "*", maxAge = 3600)
public class JobManagementController {

    @Autowired
    private JobService jobService;

    @GetMapping
    public ResponseEntity<List<JobDTO>> getEmployerJobs(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<JobDTO> jobs = jobService.getEmployerJobs(userPrincipal.getId());
        return ResponseEntity.ok(jobs);
    }

    @PutMapping("/{jobId}")
    public ResponseEntity<JobDTO> updateJob(
            @PathVariable Long jobId,
            @Valid @RequestBody JobUpdateRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        JobDTO job = jobService.updateJob(userPrincipal.getId(), jobId, request);
        return ResponseEntity.ok(job);
    }

    @DeleteMapping("/{jobId}")
    public ResponseEntity<MessageResponse> deleteJob(
            @PathVariable Long jobId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        jobService.deleteJob(userPrincipal.getId(), jobId);
        return ResponseEntity.ok(new MessageResponse("Job deleted successfully"));
    }

    @GetMapping("/stats")
    public ResponseEntity<JobStatsDTO> getJobStats(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        JobStatsDTO stats = jobService.getJobStats(userPrincipal.getId());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/recent")
    public ResponseEntity<List<JobDTO>> getRecentEmployerJobs(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<JobDTO> jobs = jobService.getRecentEmployerJobs(userPrincipal.getId(), 3);
        return ResponseEntity.ok(jobs);
    }
}