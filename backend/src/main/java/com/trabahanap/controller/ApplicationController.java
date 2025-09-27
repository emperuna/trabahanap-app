package com.trabahanap.controller;

import com.trabahanap.dto.ApplicationDTO;
import com.trabahanap.model.Job;
import com.trabahanap.model.JobApplication;
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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ApplicationController {

    @Autowired
    private JobApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    // POST: Apply for a job (Job Seeker only)
    @PostMapping("/apply")
    @Transactional
    public ResponseEntity<?> applyForJob(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                        @RequestBody Map<String, Object> request) {
        try {
            Long jobId = Long.valueOf(request.get("jobId").toString());
            String coverLetter = (String) request.get("coverLetter");

            System.out.println("📝 User " + userPrincipal.getId() + " applying for job " + jobId);

            // Get the applicant
            User applicant = userRepository.findById(userPrincipal.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Check if user is job seeker
            boolean isJobSeeker = applicant.getRoles().stream()
                    .anyMatch(role -> role.getName().toString().equals("ROLE_USER"));

            if (!isJobSeeker) {
                return ResponseEntity.status(403).body("Only job seekers can apply for jobs");
            }

            // Get the job
            Job job = jobRepository.findById(jobId)
                    .orElseThrow(() -> new RuntimeException("Job not found"));

            // Check if already applied
            if (applicationRepository.existsByJobIdAndApplicantId(jobId, applicant.getId())) {
                return ResponseEntity.status(400).body("You have already applied for this job");
            }

            // Create application
            JobApplication application = new JobApplication(job, applicant, coverLetter);
            JobApplication savedApplication = applicationRepository.save(application);

            System.out.println("✅ Application submitted successfully");
            return ResponseEntity.ok(ApplicationDTO.fromApplication(savedApplication));

        } catch (Exception e) {
            System.err.println("❌ Error applying for job: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to apply for job: " + e.getMessage());
        }
    }

    // GET: Get user's applications (Job Seeker only)
    @GetMapping("/my-applications")
    @Transactional(readOnly = true)
    public ResponseEntity<List<ApplicationDTO>> getMyApplications(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            System.out.println("📡 Fetching applications for user: " + userPrincipal.getId());

            List<JobApplication> applications = applicationRepository.findByApplicantIdWithDetails(userPrincipal.getId());
            List<ApplicationDTO> applicationDTOs = applications.stream()
                    .map(ApplicationDTO::fromApplication)
                    .collect(Collectors.toList());

            System.out.println("📨 Found " + applicationDTOs.size() + " applications");
            return ResponseEntity.ok(applicationDTOs);

        } catch (Exception e) {
            System.err.println("❌ Error fetching applications: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // GET: Check if user has applied for a job
    @GetMapping("/check/{jobId}")
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, Boolean>> checkApplication(@PathVariable Long jobId,
                                                                @AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            boolean hasApplied = applicationRepository.existsByJobIdAndApplicantId(jobId, userPrincipal.getId());
            return ResponseEntity.ok(Map.of("hasApplied", hasApplied));
        } catch (Exception e) {
            System.err.println("❌ Error checking application: " + e.getMessage());
            return ResponseEntity.status(500).body(Map.of("hasApplied", false));
        }
    }

    // GET: Get applications for employer's jobs (Employer only)
    @GetMapping("/employer/applications")
    @Transactional(readOnly = true)
    public ResponseEntity<List<ApplicationDTO>> getEmployerApplications(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            System.out.println("📡 Fetching applications for employer: " + userPrincipal.getId());

            User employer = userRepository.findById(userPrincipal.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            boolean isEmployer = employer.getRoles().stream()
                    .anyMatch(role -> role.getName().toString().equals("ROLE_EMPLOYER"));

            if (!isEmployer) {
                return ResponseEntity.status(403).body(null);
            }

            List<JobApplication> applications = applicationRepository.findByEmployerIdWithDetails(employer.getId());
            List<ApplicationDTO> applicationDTOs = applications.stream()
                    .map(ApplicationDTO::fromApplication)
                    .collect(Collectors.toList());

            System.out.println("📨 Found " + applicationDTOs.size() + " applications for employer");
            return ResponseEntity.ok(applicationDTOs);

        } catch (Exception e) {
            System.err.println("❌ Error fetching employer applications: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // Update application status (Employer only)
    @PutMapping("/update-status/{applicationId}")
    @Transactional
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestBody Map<String, String> request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            String newStatus = request.get("status");

            System.out.println("🔄 Updating application " + applicationId + " to status: " + newStatus);

            // Get the employer
            User employer = userRepository.findById(userPrincipal.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Check if user is employer
            boolean isEmployer = employer.getRoles().stream()
                    .anyMatch(role -> role.getName().toString().equals("ROLE_EMPLOYER"));

            if (!isEmployer) {
                return ResponseEntity.status(403).body("Only employers can update application status");
            }

            // Get the application
            JobApplication application = applicationRepository.findById(applicationId)
                    .orElseThrow(() -> new RuntimeException("Application not found"));

            // Verify this application belongs to employer's job
            if (!application.getJob().getPostedBy().getId().equals(employer.getId())) {
                return ResponseEntity.status(403).body("You can only update applications for your own jobs");
            }

            // Validate status
            try {
                JobApplication.ApplicationStatus status = JobApplication.ApplicationStatus.valueOf(newStatus.toUpperCase());
                application.setStatus(status);
                application.setUpdatedAt(LocalDateTime.now());

                JobApplication updatedApplication = applicationRepository.save(application);

                System.out.println("✅ Application status updated successfully");
                return ResponseEntity.ok(ApplicationDTO.fromApplication(updatedApplication));

            } catch (IllegalArgumentException e) {
                return ResponseEntity.status(400).body("Invalid status: " + newStatus);
            }

        } catch (Exception e) {
            System.err.println("❌ Error updating application status: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to update application status: " + e.getMessage());
        }
    }

    // Bulk update application status (Optional - for future use)
    @PutMapping("/bulk-update-status")
    @Transactional
    public ResponseEntity<?> bulkUpdateApplicationStatus(
            @RequestBody Map<String, Object> request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            @SuppressWarnings("unchecked")
            List<Long> applicationIds = (List<Long>) request.get("applicationIds");
            String newStatus = (String) request.get("status");

            System.out.println("🔄 Bulk updating " + applicationIds.size() + " applications to status: " + newStatus);

            // Get the employer
            User employer = userRepository.findById(userPrincipal.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Check if user is employer
            boolean isEmployer = employer.getRoles().stream()
                    .anyMatch(role -> role.getName().toString().equals("ROLE_EMPLOYER"));

            if (!isEmployer) {
                return ResponseEntity.status(403).body("Only employers can update application status");
            }

            // Validate status
            JobApplication.ApplicationStatus status;
            try {
                status = JobApplication.ApplicationStatus.valueOf(newStatus.toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.status(400).body("Invalid status: " + newStatus);
            }

            List<JobApplication> updatedApplications = new ArrayList<>();

            for (Long applicationId : applicationIds) {
                JobApplication application = applicationRepository.findById(applicationId)
                        .orElseThrow(() -> new RuntimeException("Application not found: " + applicationId));

                // Verify this application belongs to employer's job
                if (!application.getJob().getPostedBy().getId().equals(employer.getId())) {
                    continue; // Skip applications that don't belong to this employer
                }

                application.setStatus(status);
                application.setUpdatedAt(LocalDateTime.now());
                updatedApplications.add(applicationRepository.save(application));
            }

            List<ApplicationDTO> updatedDTOs = updatedApplications.stream()
                    .map(ApplicationDTO::fromApplication)
                    .collect(Collectors.toList());

            System.out.println("✅ " + updatedApplications.size() + " applications updated successfully");
            return ResponseEntity.ok(updatedDTOs);

        } catch (Exception e) {
            System.err.println("❌ Error bulk updating application status: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to update application status: " + e.getMessage());
        }
    }

}
