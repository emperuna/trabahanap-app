package com.trabahanap.mapper;

import com.trabahanap.dto.response.UserInfoResponse;
import com.trabahanap.model.User;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper for User entity to DTO conversions.
 */
public class UserMapper {

    private UserMapper() {
        // Prevent instantiation
    }

    /**
     * Convert User entity to UserInfoResponse.
     */
    public static UserInfoResponse toUserInfoResponse(User user) {
        List<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toList());

        return new UserInfoResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhone(),
                roles);
    }
}
