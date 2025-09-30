package com.trabahanap.controller;

import com.trabahanap.model.User;
import com.trabahanap.repository.UserRepository;
import com.trabahanap.service.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserProfileController {

    @Autowired
    private UserRepository userRepository;

    // GET: Get user profile
    @GetMapping("/profile")
    @Transactional(readOnly = true)
    public ResponseEntity<?> getUserProfile(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            System.out.println("👤 Getting user profile for: " + userPrincipal.getId());

            Optional<User> userOptional = userRepository.findById(userPrincipal.getId());
            if (!userOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            User user = userOptional.get();
            
            // Create response without sensitive data
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("firstName", user.getFirstName());
            response.put("lastName", user.getLastName());
            response.put("phone", user.getPhone());
            response.put("location", user.getLocation());
            response.put("bio", user.getBio());
            response.put("profilePicture", user.getProfilePicture());
            response.put("createdAt", user.getCreatedAt());
            response.put("updatedAt", user.getUpdatedAt());

            System.out.println("✅ User profile retrieved successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.err.println("❌ Error getting user profile: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error retrieving user profile");
        }
    }

    // PUT: Update user profile
    @PutMapping("/profile")
    @Transactional
    public ResponseEntity<?> updateUserProfile(
            @RequestBody Map<String, Object> request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            System.out.println("📝 Updating user profile for: " + userPrincipal.getId());
            System.out.println("📦 Update data: " + request);

            Optional<User> userOptional = userRepository.findById(userPrincipal.getId());
            if (!userOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            User user = userOptional.get();

            // Update fields if they exist in the request
            if (request.containsKey("firstName") && request.get("firstName") != null) {
                user.setFirstName(request.get("firstName").toString());
            }
            if (request.containsKey("lastName") && request.get("lastName") != null) {
                user.setLastName(request.get("lastName").toString());
            }
            if (request.containsKey("email") && request.get("email") != null) {
                user.setEmail(request.get("email").toString());
            }
            if (request.containsKey("phoneNumber") && request.get("phoneNumber") != null) {
                user.setPhone(request.get("phoneNumber").toString());
            }
            if (request.containsKey("location") && request.get("location") != null) {
                user.setLocation(request.get("location").toString());
            }
            if (request.containsKey("bio") && request.get("bio") != null) {
                user.setBio(request.get("bio").toString());
            }

            // Save updated user
            User updatedUser = userRepository.save(user);

            // Create response
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Profile updated successfully");
            
            Map<String, Object> userResponse = new HashMap<>();
            userResponse.put("id", updatedUser.getId());
            userResponse.put("username", updatedUser.getUsername());
            userResponse.put("email", updatedUser.getEmail());
            userResponse.put("firstName", updatedUser.getFirstName());
            userResponse.put("lastName", updatedUser.getLastName());
            userResponse.put("phone", updatedUser.getPhone());
            userResponse.put("location", updatedUser.getLocation());
            userResponse.put("bio", updatedUser.getBio());
            userResponse.put("profilePicture", updatedUser.getProfilePicture());
            
            response.put("user", userResponse);

            System.out.println("✅ User profile updated successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.err.println("❌ Error updating user profile: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error updating user profile");
        }
    }
}