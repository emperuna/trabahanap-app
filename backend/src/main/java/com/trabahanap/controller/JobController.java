package com.trabahanap.controller;

import com.trabahanap.dto.JobDTO;
import com.trabahanap.model.Job;
import com.trabahanap.model.User;
import com.trabahanap.repository.JobRepository;
import com.trabahanap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*", maxAge = 3600)
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<List<JobDTO>> getAllJobs() {
        try {
            List<Job> jobs = jobRepository.findAll();
            List<JobDTO> jobDTOs = jobs.stream()
                    .map(JobDTO::fromJob)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(jobDTOs);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<?> postJob(@AuthenticationPrincipal com.trabahanap.service.UserPrincipal userPrincipal,
                                    @RequestBody Job job) {
        // Load full user entity
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Verify role
        boolean isEmployer = user.getRoles().stream()
                .anyMatch(role -> role.getName().name().equals("ROLE_EMPLOYER"));
        if (!isEmployer) {
            return ResponseEntity.status(403).body("Only employers can post jobs.");
        }

        // Assign employer to job
        job.setPostedBy(user);
        jobRepository.save(job);

        return ResponseEntity.ok("Job posted successfully.");
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<JobDTO> getJobById(@PathVariable Long id) {
        try {
            System.out.println("📡 Fetching job with ID: " + id);
            
            Job job = jobRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Job not found"));
            
            // Force initialization of lazy-loaded properties
            if (job.getPostedBy() != null) {
                job.getPostedBy().getUsername(); // This triggers lazy loading
            }
                    
            JobDTO jobDTO = JobDTO.fromJob(job);
            System.out.println("✅ Job found: " + jobDTO.getTitle());
            
            return ResponseEntity.ok(jobDTO);
            
        } catch (Exception e) {
            System.err.println("❌ Error fetching job: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(404).body(null);
        }
    }

}