package com.trabahanap.controller;

import com.trabahanap.dto.ApplicationDTO;
import com.trabahanap.model.Job;
import com.trabahanap.model.JobApplication;
import com.trabahanap.model.User;
import com.trabahanap.repository.JobApplicationRepository;
import com.trabahanap.repository.JobRepository;
import com.trabahanap.repository.UserRepository;
import com.trabahanap.service.FileStorageService;
import com.trabahanap.service.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
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
    
    // Add file storage service
    @Autowired
    private FileStorageService fileStorageService;

    // POST: Apply for a job (Job Seeker only)
    @PostMapping("/apply")
    @Transactional
    public ResponseEntity<?> applyForJob(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam("jobId") Long jobId,
            @RequestParam("coverLetterText") String coverLetterText,
            @RequestParam(value = "coverLetterPdf", required = false) MultipartFile coverLetterPdf,
            @RequestParam(value = "resumePdf", required = false) MultipartFile resumePdf) {
        
        try {
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

            String coverLetterPath = null;
            String resumePath = null;

            // Handle file uploads
            if (coverLetterPdf != null && !coverLetterPdf.isEmpty()) {
                coverLetterPath = fileStorageService.storeFile(coverLetterPdf, "cover-letters");
            }

            if (resumePdf != null && !resumePdf.isEmpty()) {
                resumePath = fileStorageService.storeFile(resumePdf, "resumes");
            }

            // Create application
            JobApplication application = new JobApplication(job, applicant, coverLetterText);
            application.setCoverLetterPath(coverLetterPath);
            application.setResumePath(resumePath);
            application.setCoverLetterText(coverLetterText);
            
            JobApplication savedApplication = applicationRepository.save(application);

            System.out.println("✅ Application submitted successfully with PDFs");
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
    @GetMapping("/employer")
    public ResponseEntity<List<ApplicationDTO>> getEmployerApplications(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            System.out.println("📡 Fetching applications for employer: " + userPrincipal.getId());

            // Get the employer
            User employer = userRepository.findById(userPrincipal.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Check if user is employer
            boolean isEmployer = employer.getRoles().stream()
                    .anyMatch(role -> role.getName().toString().equals("ROLE_EMPLOYER"));

            if (!isEmployer) {
                return ResponseEntity.status(403).body(null);
            }

            // Use existing method with fallback
            List<Job> employerJobs;
            try {
                // Try the existing method first
                employerJobs = jobRepository.findByPostedByOrderByCreatedAtDesc(employer);
            } catch (Exception e) {
                // Fallback to the custom query method that exists
                System.out.println("⚠️ Using fallback query method");
                employerJobs = jobRepository.findJobsByEmployerId(employer.getId());
            }
            
            // Use the existing method to get applications by employer ID
            List<JobApplication> applications = applicationRepository.findByEmployerIdWithDetails(userPrincipal.getId());

            // Convert to DTOs
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

    // Add endpoint to download PDF files
    @GetMapping("/download/{applicationId}/{fileType}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable Long applicationId,
            @PathVariable String fileType,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        try {
            JobApplication application = applicationRepository.findById(applicationId)
                    .orElseThrow(() -> new RuntimeException("Application not found"));

            // Check permissions (only applicant or job poster can download)
            if (!application.getApplicant().getId().equals(userPrincipal.getId()) &&
                !application.getJob().getPostedBy().getId().equals(userPrincipal.getId())) {
                return ResponseEntity.status(403).build();
            }

            String filePath;
            String fileName;
            
            if ("cover-letter".equals(fileType)) {
                filePath = application.getCoverLetterPath();
                fileName = "cover-letter.pdf";
            } else if ("resume".equals(fileType)) {
                filePath = application.getResumePath();
                fileName = "resume.pdf";
            } else {
                return ResponseEntity.badRequest().build();
            }

            Resource resource = fileStorageService.loadFileAsResource(filePath);
            
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, 
                            "attachment; filename=\"" + fileName + "\"")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Add this method to your existing ApplicationController

    @GetMapping("/view/{applicationId}/{fileType}")
    public ResponseEntity<Resource> viewFile(
            @PathVariable Long applicationId,
            @PathVariable String fileType,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
    
        try {
            System.out.println("=== PDF VIEW REQUEST ===");
            System.out.println("📄 Application ID: " + applicationId);
            System.out.println("📄 File Type: " + fileType);
            System.out.println("📄 User ID: " + (userPrincipal != null ? userPrincipal.getId() : "NULL"));
            
            if (userPrincipal == null) {
                System.out.println("❌ UserPrincipal is null - authentication failed");
                return ResponseEntity.status(401).build();
            }
            
            System.out.println("📄 Looking for application...");
            JobApplication application = applicationRepository.findById(applicationId)
                    .orElseThrow(() -> new RuntimeException("Application not found"));

            System.out.println("📄 Application found:");
            System.out.println("   - Applicant ID: " + application.getApplicant().getId());
            System.out.println("   - Job ID: " + application.getJob().getId());
            System.out.println("   - Job Poster ID: " + application.getJob().getPostedBy().getId());

            // Check permissions
            boolean isApplicant = application.getApplicant().getId().equals(userPrincipal.getId());
            boolean isJobPoster = application.getJob().getPostedBy().getId().equals(userPrincipal.getId());
            
            System.out.println("📄 Permission check:");
            System.out.println("   - Is Applicant: " + isApplicant);
            System.out.println("   - Is Job Poster: " + isJobPoster);
            
            if (!isApplicant && !isJobPoster) {
                System.out.println("❌ Access denied - User is neither applicant nor job poster");
                return ResponseEntity.status(403).build();
            }

            String filePath = null;
            
            if ("cover-letter".equals(fileType)) {
                filePath = application.getCoverLetterPath();
                System.out.println("📄 Cover letter path: " + filePath);
            } else if ("resume".equals(fileType)) {
                filePath = application.getResumePath();
                System.out.println("📄 Resume path: " + filePath);
            } else {
                System.out.println("❌ Invalid file type: " + fileType);
                return ResponseEntity.badRequest().build();
            }

            if (filePath == null || filePath.trim().isEmpty()) {
                System.out.println("❌ File path is null or empty for " + fileType);
                return ResponseEntity.notFound().build();
            }

            System.out.println("📄 Attempting to load file: " + filePath);
            
            // Check if fileStorageService is null
            if (fileStorageService == null) {
                System.out.println("❌ FileStorageService is null!");
                return ResponseEntity.status(500).body(null);
            }
            
            Resource resource = fileStorageService.loadFileAsResource(filePath);
            
            if (resource == null || !resource.exists()) {
                System.out.println("❌ Resource not found or doesn't exist: " + filePath);
                return ResponseEntity.notFound().build();
            }
            
            System.out.println("✅ File found and accessible, serving: " + filePath);
            
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
                    .header("X-Frame-Options", "SAMEORIGIN")
                    .header(HttpHeaders.CACHE_CONTROL, "no-cache, no-store, must-revalidate")
                    .header(HttpHeaders.PRAGMA, "no-cache")
                    .header(HttpHeaders.EXPIRES, "0")
                    .body(resource);

        } catch (Exception e) {
            System.err.println("❌ ERROR in viewFile:");
            System.err.println("   Message: " + e.getMessage());
            System.err.println("   Class: " + e.getClass().getSimpleName());
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
