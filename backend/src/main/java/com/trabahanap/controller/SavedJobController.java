package com.trabahanap.controller;

import com.trabahanap.model.Job;
import com.trabahanap.model.SavedJob;
import com.trabahanap.model.User;
import com.trabahanap.repository.JobRepository;
import com.trabahanap.repository.SavedJobRepository;
import com.trabahanap.repository.UserRepository;
import com.trabahanap.service.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/saved-jobs")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SavedJobController {

    @Autowired
    private SavedJobRepository savedJobRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    // Save a job
    @PostMapping("/save/{jobId}")
    @Transactional
    public ResponseEntity<?> saveJob(
            @PathVariable Long jobId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        try {
            System.out.println("💾 User " + userPrincipal.getId() + " saving job " + jobId);

            // Check if already saved
            if (savedJobRepository.existsByUserIdAndJobId(userPrincipal.getId(), jobId)) {
                return ResponseEntity.status(400).body("Job already saved");
            }

            // Get user and job
            User user = userRepository.findById(userPrincipal.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            Job job = jobRepository.findById(jobId)
                    .orElseThrow(() -> new RuntimeException("Job not found"));

            // Create saved job
            SavedJob savedJob = new SavedJob(user, job);
            savedJobRepository.save(savedJob);

            System.out.println("✅ Job saved successfully");
            return ResponseEntity.ok("Job saved successfully");

        } catch (Exception e) {
            System.err.println("❌ Error saving job: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to save job: " + e.getMessage());
        }
    }

    // Remove saved job
    @DeleteMapping("/remove/{jobId}")
    @Transactional
    public ResponseEntity<?> removeSavedJob(
            @PathVariable Long jobId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        try {
            System.out.println("🗑️ User " + userPrincipal.getId() + " removing saved job " + jobId);

            savedJobRepository.deleteByUserIdAndJobId(userPrincipal.getId(), jobId);

            System.out.println("✅ Saved job removed successfully");
            return ResponseEntity.ok("Job removed from saved list");

        } catch (Exception e) {
            System.err.println("❌ Error removing saved job: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to remove saved job: " + e.getMessage());
        }
    }

    // Get all saved jobs for user
    @GetMapping("/my-saved-jobs")
    public ResponseEntity<?> getMySavedJobs(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            System.out.println("📋 Getting saved jobs for user " + userPrincipal.getId());

            List<SavedJob> savedJobs = savedJobRepository.findByUserIdWithJobDetails(userPrincipal.getId());

            List<Map<String, Object>> savedJobDTOs = savedJobs.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());

            System.out.println("✅ Found " + savedJobDTOs.size() + " saved jobs");
            return ResponseEntity.ok(savedJobDTOs);

        } catch (Exception e) {
            System.err.println("❌ Error getting saved jobs: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to get saved jobs: " + e.getMessage());
        }
    }

    // Check if job is saved
    @GetMapping("/is-saved/{jobId}")
    public ResponseEntity<?> isJobSaved(
            @PathVariable Long jobId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        try {
            boolean isSaved = savedJobRepository.existsByUserIdAndJobId(userPrincipal.getId(), jobId);
            
            Map<String, Boolean> response = new HashMap<>();
            response.put("isSaved", isSaved);
            
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.err.println("❌ Error checking if job is saved: " + e.getMessage());
            return ResponseEntity.status(500).body("Failed to check saved status");
        }
    }

    // Get saved jobs count
    @GetMapping("/count")
    public ResponseEntity<?> getSavedJobsCount(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            long count = savedJobRepository.countByUserId(userPrincipal.getId());
            
            Map<String, Long> response = new HashMap<>();
            response.put("count", count);
            
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.err.println("❌ Error getting saved jobs count: " + e.getMessage());
            return ResponseEntity.status(500).body("Failed to get saved jobs count");
        }
    }

    private Map<String, Object> convertToDTO(SavedJob savedJob) {
        Map<String, Object> dto = new HashMap<>();
        Job job = savedJob.getJob();
        
        dto.put("id", savedJob.getId());
        dto.put("savedAt", savedJob.getSavedAt());
        
        // Job details
        Map<String, Object> jobDetails = new HashMap<>();
        jobDetails.put("id", job.getId());
        jobDetails.put("title", job.getTitle());
        jobDetails.put("company", job.getCompany());
        jobDetails.put("location", job.getLocation());
        jobDetails.put("jobType", job.getJobType());
        jobDetails.put("description", job.getDescription());
        jobDetails.put("requirements", job.getRequirements());
        jobDetails.put("salary", job.getSalary());
        jobDetails.put("postedBy", job.getPostedBy().getUsername());
        
        dto.put("job", jobDetails);
        
        return dto;
    }
}