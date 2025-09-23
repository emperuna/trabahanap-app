package com.trabahanap.controller;

import com.trabahanap.model.Job;
import com.trabahanap.model.User;
import com.trabahanap.repository.JobRepository;
import com.trabahanap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    // @PostMapping
    // public ResponseEntity<?> postJob(@AuthenticationPrincipal User user, @RequestBody Job job) {
    //     if (!user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_EMPLOYER"))) {
    //         return ResponseEntity.status(403).body("Only employers can post jobs.");
    //     }

    //     job.setPostedBy(user);
    //     jobRepository.save(job);
    //     return ResponseEntity.ok("Job posted successfully.");
    // }

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

}