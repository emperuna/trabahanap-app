package com.trabahanap.controller;

import com.trabahanap.dto.request.StatusUpdateRequest;
import com.trabahanap.dto.response.ApplicationDTO;
import com.trabahanap.model.JobApplication;
import com.trabahanap.repository.JobApplicationRepository;
import com.trabahanap.service.ApplicationService;
import com.trabahanap.service.FileStorageService;
import com.trabahanap.security.UserPrincipal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller for job application endpoints.
 * Delegates business logic to ApplicationService.
 */
@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private JobApplicationRepository applicationRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/apply")
    public ResponseEntity<ApplicationDTO> applyForJob(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam("jobId") Long jobId,
            @RequestParam("coverLetterText") String coverLetterText,
            @RequestParam(value = "coverLetterPdf", required = false) MultipartFile coverLetterPdf,
            @RequestParam(value = "resumePdf", required = false) MultipartFile resumePdf) {

        ApplicationDTO application = applicationService.applyForJob(
                userPrincipal.getId(), jobId, coverLetterText, coverLetterPdf, resumePdf);
        return ResponseEntity.ok(application);
    }

    @GetMapping("/my-applications")
    public ResponseEntity<List<ApplicationDTO>> getMyApplications(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<ApplicationDTO> applications = applicationService.getMyApplications(userPrincipal.getId());
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/check/{jobId}")
    public ResponseEntity<Map<String, Boolean>> checkApplication(
            @PathVariable Long jobId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        boolean hasApplied = applicationService.hasApplied(userPrincipal.getId(), jobId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("hasApplied", hasApplied);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/employer")
    public ResponseEntity<List<ApplicationDTO>> getEmployerApplications(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<ApplicationDTO> applications = applicationService.getEmployerApplications(userPrincipal.getId());
        return ResponseEntity.ok(applications);
    }

    @PutMapping("/update-status/{applicationId}")
    public ResponseEntity<ApplicationDTO> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestBody StatusUpdateRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        ApplicationDTO application = applicationService.updateApplicationStatus(
                userPrincipal.getId(), applicationId, request.getStatus());
        return ResponseEntity.ok(application);
    }

    @GetMapping("/download/{applicationId}/{fileType}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable Long applicationId,
            @PathVariable String fileType,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        JobApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        // Check permissions
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

        if (filePath == null) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = fileStorageService.loadFileAsResource(filePath);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }

    @GetMapping("/view/{applicationId}/{fileType}")
    public ResponseEntity<Resource> viewFile(
            @PathVariable Long applicationId,
            @PathVariable String fileType,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        if (userPrincipal == null) {
            return ResponseEntity.status(401).build();
        }

        JobApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        // Check permissions
        boolean isApplicant = application.getApplicant().getId().equals(userPrincipal.getId());
        boolean isJobPoster = application.getJob().getPostedBy().getId().equals(userPrincipal.getId());

        if (!isApplicant && !isJobPoster) {
            return ResponseEntity.status(403).build();
        }

        String filePath;

        if ("cover-letter".equals(fileType)) {
            filePath = application.getCoverLetterPath();
        } else if ("resume".equals(fileType)) {
            filePath = application.getResumePath();
        } else {
            return ResponseEntity.badRequest().build();
        }

        if (filePath == null || filePath.trim().isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = fileStorageService.loadFileAsResource(filePath);

        if (resource == null || !resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
                .header("X-Frame-Options", "SAMEORIGIN")
                .header(HttpHeaders.CACHE_CONTROL, "no-cache, no-store, must-revalidate")
                .body(resource);
    }
}
