package com.trabahanap.controller;

import com.trabahanap.dto.request.JobCreateRequest;
import com.trabahanap.dto.response.JobDTO;
import com.trabahanap.service.JobService;
import com.trabahanap.security.UserPrincipal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

/**
 * Controller for public job endpoints.
 * Delegates all business logic to JobService.
 */
@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*", maxAge = 3600)
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping
    public ResponseEntity<List<JobDTO>> getAllJobs() {
        List<JobDTO> jobs = jobService.getAllJobs();
        return ResponseEntity.ok(jobs);
    }

    @PostMapping
    public ResponseEntity<JobDTO> postJob(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody JobCreateRequest request) {
        JobDTO job = jobService.createJob(userPrincipal.getId(), request);
        return ResponseEntity.ok(job);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDTO> getJobById(@PathVariable Long id) {
        JobDTO job = jobService.getJobById(id);
        return ResponseEntity.ok(job);
    }
}