package com.trabahanap.service;

import com.trabahanap.dto.request.ProfileUpdateRequest;
import com.trabahanap.exception.ResourceNotFoundException;
import com.trabahanap.model.User;
import com.trabahanap.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

/**
 * Service layer for user profile operations.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Get user profile.
     */
    @Transactional(readOnly = true)
    public Map<String, Object> getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

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

        return response;
    }

    /**
     * Update user profile.
     */
    @Transactional
    public Map<String, Object> updateUserProfile(Long userId, ProfileUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        // Update fields if provided
        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getPhoneNumber() != null) {
            user.setPhone(request.getPhoneNumber());
        }
        if (request.getLocation() != null) {
            user.setLocation(request.getLocation());
        }
        if (request.getBio() != null) {
            user.setBio(request.getBio());
        }

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

        return response;
    }

    /**
     * Get user by ID.
     */
    @Transactional(readOnly = true)
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }
}
