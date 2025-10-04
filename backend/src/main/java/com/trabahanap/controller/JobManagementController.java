package com.trabahanap.controller;

import com.trabahanap.model.Job;
import com.trabahanap.model.User;
import com.trabahanap.repository.JobApplicationRepository;
import com.trabahanap.repository.JobRepository;
import com.trabahanap.repository.UserRepository;
import com.trabahanap.service.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/employer/jobs")
@CrossOrigin(origins = "*", maxAge = 3600)
public class JobManagementController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobApplicationRepository applicationRepository;

    // GET: Get employer's posted jobs
    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<?> getEmployerJobs(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            System.out.println("📋 Fetching jobs for employer: " + userPrincipal.getId());

            User employer = userRepository.findById(userPrincipal.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Check if user is employer
            boolean isEmployer = employer.getRoles().stream()
                    .anyMatch(role -> role.getName().toString().equals("ROLE_EMPLOYER"));

            if (!isEmployer) {
                return ResponseEntity.status(403).body("Only employers can view their jobs");
            }

            // Use the custom query method as fallback
            List<Job> employerJobs;
            try {
                // Try the findByPostedBy method first
                employerJobs = jobRepository.findByPostedByOrderByCreatedAtDesc(employer);
            } catch (Exception e) {
                // Fallback to custom query if postedBy field name is different
                System.out.println("⚠️ Using fallback query method");
                employerJobs = jobRepository.findJobsByEmployerId(employer.getId());
            }
            
            List<Map<String, Object>> jobResponses = employerJobs.stream()
                    .map(job -> {
                        Map<String, Object> jobMap = new HashMap<>();
                        jobMap.put("id", job.getId());
                        jobMap.put("title", job.getTitle());
                        jobMap.put("company", job.getCompany());
                        jobMap.put("location", job.getLocation());
                        jobMap.put("salary", job.getSalary());
                        jobMap.put("jobType", job.getJobType());
                        jobMap.put("description", job.getDescription());
                        jobMap.put("requirements", job.getRequirements());
                        jobMap.put("createdAt", job.getCreatedAt());
                        
                        // Add application count
                        long applicationCount = applicationRepository.countByJob(job);
                        jobMap.put("applicationCount", applicationCount);
                        
                        return jobMap;
                    })
                    .collect(Collectors.toList());

            System.out.println("✅ Found " + jobResponses.size() + " jobs for employer");
            return ResponseEntity.ok(jobResponses);

        } catch (Exception e) {
            System.err.println("❌ Error fetching employer jobs: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to fetch jobs: " + e.getMessage());
        }
    }

    // PUT: Update job
    @PutMapping("/{jobId}")
    @Transactional
    public ResponseEntity<?> updateJob(
            @PathVariable Long jobId,
            @RequestBody Map<String, Object> request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            System.out.println("📝 Updating job: " + jobId);

            User employer = userRepository.findById(userPrincipal.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Check if user is employer
            boolean isEmployer = employer.getRoles().stream()
                    .anyMatch(role -> role.getName().toString().equals("ROLE_EMPLOYER"));

            if (!isEmployer) {
                return ResponseEntity.status(403).body("Only employers can update jobs");
            }

            Job job = jobRepository.findById(jobId)
                    .orElseThrow(() -> new RuntimeException("Job not found"));

            // Verify job belongs to employer (flexible field checking)
            boolean jobBelongsToEmployer = false;
            try {
                // Try postedBy field first
                jobBelongsToEmployer = job.getPostedBy().getId().equals(employer.getId());
            } catch (Exception e) {
                // If postedBy doesn't exist, you might have a different field name
                // Uncomment and modify based on your actual Job model field:
                // jobBelongsToEmployer = job.getUser().getId().equals(employer.getId());
                // or
                // jobBelongsToEmployer = job.getEmployer().getId().equals(employer.getId());
                
                System.err.println("⚠️ Could not verify job ownership: " + e.getMessage());
                return ResponseEntity.status(500).body("Could not verify job ownership");
            }

            if (!jobBelongsToEmployer) {
                return ResponseEntity.status(403).body("You can only update your own jobs");
            }

            // Update job fields safely
            if (request.containsKey("title") && request.get("title") != null) {
                job.setTitle(request.get("title").toString());
            }
            if (request.containsKey("company") && request.get("company") != null) {
                job.setCompany(request.get("company").toString());
            }
            if (request.containsKey("location") && request.get("location") != null) {
                job.setLocation(request.get("location").toString());
            }
            if (request.containsKey("jobType") && request.get("jobType") != null) {
                job.setJobType(request.get("jobType").toString());
            }
            if (request.containsKey("description") && request.get("description") != null) {
                job.setDescription(request.get("description").toString());
            }
            if (request.containsKey("requirements") && request.get("requirements") != null) {
                job.setRequirements(request.get("requirements").toString());
            }
            if (request.containsKey("salary") && request.get("salary") != null) {
                try {
                    Object salaryObj = request.get("salary");
                    if (salaryObj instanceof Number) {
                        job.setSalary(((Number) salaryObj).doubleValue());
                    } else if (salaryObj instanceof String && !((String) salaryObj).isEmpty()) {
                        job.setSalary(Double.parseDouble((String) salaryObj));
                    }
                } catch (NumberFormatException e) {
                    return ResponseEntity.status(400).body("Invalid salary format");
                }
            }

            Job updatedJob = jobRepository.save(job);
            Map<String, Object> jobResponse = createJobResponse(updatedJob);

            System.out.println("✅ Job updated successfully");
            return ResponseEntity.ok(jobResponse);

        } catch (Exception e) {
            System.err.println("❌ Error updating job: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to update job: " + e.getMessage());
        }
    }

    // DELETE: Delete job
    @DeleteMapping("/{jobId}")
    @Transactional
    public ResponseEntity<?> deleteJob(
            @PathVariable Long jobId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            System.out.println("🗑️ Deleting job: " + jobId);

            User employer = userRepository.findById(userPrincipal.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Check if user is employer
            boolean isEmployer = employer.getRoles().stream()
                    .anyMatch(role -> role.getName().toString().equals("ROLE_EMPLOYER"));

            if (!isEmployer) {
                return ResponseEntity.status(403).body("Only employers can delete jobs");
            }

            Job job = jobRepository.findById(jobId)
                    .orElseThrow(() -> new RuntimeException("Job not found"));

            // Verify job belongs to employer
            boolean jobBelongsToEmployer = false;
            try {
                jobBelongsToEmployer = job.getPostedBy().getId().equals(employer.getId());
            } catch (Exception e) {
                System.err.println("⚠️ Could not verify job ownership: " + e.getMessage());
                return ResponseEntity.status(500).body("Could not verify job ownership");
            }

            if (!jobBelongsToEmployer) {
                return ResponseEntity.status(403).body("You can only delete your own jobs");
            }

            // Check if job has applications
            long applicationCount = applicationRepository.countByJob(job);
            if (applicationCount > 0) {
                return ResponseEntity.status(400).body(
                    "Cannot delete job with existing applications. Please contact support."
                );
            }

            jobRepository.delete(job);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Job deleted successfully");
            System.out.println("✅ Job deleted successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.err.println("❌ Error deleting job: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to delete job: " + e.getMessage());
        }
    }

    // GET: Get job statistics for employer
    @GetMapping("/stats")
    @Transactional(readOnly = true)
    public ResponseEntity<?> getJobStats(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            System.out.println("📊 Fetching job stats for employer: " + userPrincipal.getId());

            User employer = userRepository.findById(userPrincipal.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Get job count using repository method
            long totalJobs;
            try {
                totalJobs = jobRepository.countByPostedBy(employer);
            } catch (Exception e) {
                // Fallback to fetching all jobs and counting
                List<Job> employerJobs = jobRepository.findJobsByEmployerId(employer.getId());
                totalJobs = employerJobs.size();
            }

            // Calculate total applications
            List<Job> employerJobs = jobRepository.findJobsByEmployerId(employer.getId());
            long totalApplications = employerJobs.stream()
                    .mapToLong(job -> applicationRepository.countByJob(job))
                    .sum();

            Map<String, Object> stats = new HashMap<>();
            stats.put("totalJobs", totalJobs);
            stats.put("totalApplications", totalApplications);

            System.out.println("✅ Job stats calculated successfully");
            return ResponseEntity.ok(stats);

        } catch (Exception e) {
            System.err.println("❌ Error fetching job stats: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to fetch job statistics: " + e.getMessage());
        }
    }

    // GET: Get recent jobs for employer
    @GetMapping("/recent")
    @Transactional(readOnly = true)
    public ResponseEntity<?> getRecentEmployerJobs(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            System.out.println("📋 Fetching recent jobs for employer: " + userPrincipal.getId());

            User employer = userRepository.findById(userPrincipal.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Check if user is employer
            boolean isEmployer = employer.getRoles().stream()
                    .anyMatch(role -> role.getName().toString().equals("ROLE_EMPLOYER"));

            if (!isEmployer) {
                return ResponseEntity.status(403).body("Only employers can view their jobs");
            }

            // ✅ Get recent jobs (limit to 3 most recent)
            List<Job> recentJobs;
            try {
                // ✅ Change method name to Top3
                recentJobs = jobRepository.findTop3ByPostedByOrderByCreatedAtDesc(employer);
            } catch (Exception e) {
                System.out.println("⚠️ Using fallback query method for recent jobs");
                List<Job> allJobs = jobRepository.findJobsByEmployerId(employer.getId());
                recentJobs = allJobs.stream()
                        .sorted((j1, j2) -> j2.getCreatedAt().compareTo(j1.getCreatedAt()))
                        .limit(3) // ✅ Keep limit to 3
                        .collect(Collectors.toList());
            }

            List<Map<String, Object>> jobResponses = recentJobs.stream()
                    .map(job -> {
                        Map<String, Object> jobMap = new HashMap<>();
                        jobMap.put("id", job.getId());
                        jobMap.put("title", job.getTitle());
                        jobMap.put("company", job.getCompany());
                        jobMap.put("location", job.getLocation());
                        jobMap.put("jobType", job.getJobType());
                        jobMap.put("description", job.getDescription());
                        jobMap.put("requirements", job.getRequirements());
                        jobMap.put("salary", job.getSalary());
                        jobMap.put("createdAt", job.getCreatedAt());
                        
                        // Get application count for this job
                        long applicationCount = applicationRepository.countByJobId(job.getId());
                        jobMap.put("applicationCount", applicationCount);
                        
                        return jobMap;
                    })
                    .collect(Collectors.toList());

            System.out.println("✅ Found " + jobResponses.size() + " recent jobs (max 3)");
            return ResponseEntity.ok(jobResponses);

        } catch (Exception e) {
            System.err.println("❌ Error fetching recent jobs: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to fetch recent jobs: " + e.getMessage());
        }
    }

    // Helper method to create job response map
    private Map<String, Object> createJobResponse(Job job) {
        Map<String, Object> jobMap = new HashMap<>();
        jobMap.put("id", job.getId());
        jobMap.put("title", job.getTitle());
        jobMap.put("company", job.getCompany());
        jobMap.put("location", job.getLocation());
        jobMap.put("salary", job.getSalary());
        jobMap.put("jobType", job.getJobType());
        jobMap.put("description", job.getDescription());
        jobMap.put("requirements", job.getRequirements());
        jobMap.put("createdAt", job.getCreatedAt());
        
        // Add application count
        long applicationCount = applicationRepository.countByJob(job);
        jobMap.put("applicationCount", applicationCount);
        
        return jobMap;
    }
}