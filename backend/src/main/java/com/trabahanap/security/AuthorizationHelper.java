package com.trabahanap.security;

import com.trabahanap.model.User;
import com.trabahanap.exception.ForbiddenException;

/**
 * Helper utilities for authorization checks.
 */
public class AuthorizationHelper {

    /**
     * Check if user has employer role.
     */
    public static boolean isEmployer(User user) {
        return user.getRoles().stream()
                .anyMatch(role -> role.getName().name().equals("ROLE_EMPLOYER"));
    }

    /**
     * Check if user has job seeker role.
     */
    public static boolean isJobSeeker(User user) {
        return user.getRoles().stream()
                .anyMatch(role -> role.getName().name().equals("ROLE_JOBSEEKER"));
    }

    /**
     * Check if user has admin role.
     */
    public static boolean isAdmin(User user) {
        return user.getRoles().stream()
                .anyMatch(role -> role.getName().name().equals("ROLE_ADMIN"));
    }

    /**
     * Require employer role or throw ForbiddenException.
     */
    public static void requireEmployer(User user) {
        if (!isEmployer(user)) {
            throw new ForbiddenException("Only employers can perform this action");
        }
    }

    /**
     * Require job seeker role or throw ForbiddenException.
     */
    public static void requireJobSeeker(User user) {
        if (!isJobSeeker(user)) {
            throw new ForbiddenException("Only job seekers can perform this action");
        }
    }

    /**
     * Require admin role or throw ForbiddenException.
     */
    public static void requireAdmin(User user) {
        if (!isAdmin(user)) {
            throw new ForbiddenException("Only administrators can perform this action");
        }
    }
}
