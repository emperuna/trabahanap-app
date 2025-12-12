package com.trabahanap.controller;

import com.trabahanap.service.SavedJobService;
import com.trabahanap.security.UserPrincipal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller for saved job endpoints.
 * Delegates all business logic to SavedJobService.
 */
@RestController
@RequestMapping("/api/saved-jobs")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SavedJobController {

    @Autowired
    private SavedJobService savedJobService;

    @PostMapping("/save/{jobId}")
    public ResponseEntity<?> saveJob(
            @PathVariable Long jobId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        savedJobService.saveJob(userPrincipal.getId(), jobId);
        return ResponseEntity.ok("Job saved successfully");
    }

    @DeleteMapping("/remove/{jobId}")
    public ResponseEntity<?> removeSavedJob(
            @PathVariable Long jobId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        savedJobService.removeSavedJob(userPrincipal.getId(), jobId);
        return ResponseEntity.ok("Job removed from saved list");
    }

    @GetMapping("/my-saved-jobs")
    public ResponseEntity<List<Map<String, Object>>> getMySavedJobs(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<Map<String, Object>> savedJobs = savedJobService.getMySavedJobs(userPrincipal.getId());
        return ResponseEntity.ok(savedJobs);
    }

    @GetMapping("/is-saved/{jobId}")
    public ResponseEntity<Map<String, Boolean>> isJobSaved(
            @PathVariable Long jobId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        boolean isSaved = savedJobService.isJobSaved(userPrincipal.getId(), jobId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isSaved", isSaved);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getSavedJobsCount(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        long count = savedJobService.getSavedJobsCount(userPrincipal.getId());
        Map<String, Long> response = new HashMap<>();
        response.put("count", count);
        return ResponseEntity.ok(response);
    }
}