package com.trabahanap.controller;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.trabahanap.dto.UserResumeDTO;
import com.trabahanap.model.User;
import com.trabahanap.service.UserResumeService;

@RestController
@RequestMapping("/api/users/resume")
public class UserResumeController {
    
    private final UserResumeService userResumeService;
    
    public UserResumeController(UserResumeService userResumeService) {
        this.userResumeService = userResumeService;
    }
    
    /**
     * Upload a new resume
     * POST /api/users/resume
     */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UserResumeDTO> uploadResume(
            @AuthenticationPrincipal User user,
            @RequestParam("resume") MultipartFile file) {
        
        UserResumeDTO resume = userResumeService.uploadResume(user.getId(), file);
        return ResponseEntity.status(HttpStatus.CREATED).body(resume);
    }
    
    /**
     * Get all user's resumes
     * GET /api/users/resume
     */
    @GetMapping
    public ResponseEntity<List<UserResumeDTO>> getUserResumes(
            @AuthenticationPrincipal User user) {
        
        List<UserResumeDTO> resumes = userResumeService.getUserResumes(user.getId());
        return ResponseEntity.ok(resumes);
    }
    
    /**
     * Get default resume
     * GET /api/users/resume/default
     */
    @GetMapping("/default")
    public ResponseEntity<UserResumeDTO> getDefaultResume(
            @AuthenticationPrincipal User user) {

        UserResumeDTO resume = userResumeService.getDefaultResume(user.getId());
        return ResponseEntity.ok(resume);
    }
    
    /**
     * Set resume as default
     * PATCH /api/users/resume/{id}/default
     */
    @PatchMapping("/{id}/default")
    public ResponseEntity<UserResumeDTO> setDefaultResume(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        
        UserResumeDTO resume = userResumeService.setDefaultResume(id, user.getId());
        return ResponseEntity.ok(resume);
    }
    
    /**
     * View resume (PDF in browser)
     * GET /api/users/resume/{id}/view
     */
    @GetMapping("/{id}/view")
    public ResponseEntity<Resource> viewResume(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        
        Resource resource = userResumeService.viewResume(id, user.getId());
        
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"resume.pdf\"")
                .body(resource);
    }
    
    /**
     * Download resume
     * GET /api/users/resume/{id}/download
     */
    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadResume(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        
        Resource resource = userResumeService.downloadResume(id, user.getId());
        
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"resume.pdf\"")
                .body(resource);
    }
    
    /**
     * Delete resume
     * DELETE /api/users/resume/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResume(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        
        userResumeService.deleteResume(id, user.getId());
        return ResponseEntity.noContent().build();
    }
    
    /**
     * Get resume count
     * GET /api/users/resume/count
     */
    @GetMapping("/count")
    public ResponseEntity<Long> getResumeCount(
            @AuthenticationPrincipal User user) {
        
        long count = userResumeService.getResumeCount(user.getId());
        return ResponseEntity.ok(count);
    }
}
