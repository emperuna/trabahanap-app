package com.trabahanap.controller;

import com.trabahanap.dto.request.ProfileUpdateRequest;
import com.trabahanap.security.UserPrincipal;
import com.trabahanap.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Map;

/**
 * Controller for user profile endpoints.
 * Delegates all business logic to UserService.
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserProfileController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getUserProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Map<String, Object> profile = userService.getUserProfile(userPrincipal.getId());
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<Map<String, Object>> updateUserProfile(
            @Valid @RequestBody ProfileUpdateRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Map<String, Object> response = userService.updateUserProfile(userPrincipal.getId(), request);
        return ResponseEntity.ok(response);
    }
}