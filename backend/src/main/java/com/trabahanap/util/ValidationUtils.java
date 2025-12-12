package com.trabahanap.util;

import org.springframework.web.multipart.MultipartFile;
import com.trabahanap.exception.BadRequestException;

/**
 * Shared validation utilities.
 */
public final class ValidationUtils {

    private ValidationUtils() {
        // Prevent instantiation
    }

    /**
     * Validate that a string is not null or empty.
     */
    public static void requireNotBlank(String value, String fieldName) {
        if (value == null || value.trim().isEmpty()) {
            throw new BadRequestException(fieldName + " is required");
        }
    }

    /**
     * Validate that a value is not null.
     */
    public static void requireNotNull(Object value, String fieldName) {
        if (value == null) {
            throw new BadRequestException(fieldName + " is required");
        }
    }

    /**
     * Validate file size.
     */
    public static void validateFileSize(MultipartFile file, long maxSize) {
        if (file.getSize() > maxSize) {
            throw new BadRequestException(
                    String.format("File size exceeds maximum allowed size of %d MB", maxSize / (1024 * 1024)));
        }
    }

    /**
     * Validate file type.
     */
    public static void validateFileType(MultipartFile file, String... allowedTypes) {
        String contentType = file.getContentType();
        if (contentType == null) {
            throw new BadRequestException("Unable to determine file type");
        }

        for (String allowedType : allowedTypes) {
            if (contentType.equals(allowedType)) {
                return;
            }
        }

        throw new BadRequestException("File type not allowed. Allowed types: " + String.join(", ", allowedTypes));
    }

    /**
     * Validate email format.
     */
    public static boolean isValidEmail(String email) {
        if (email == null)
            return false;
        return email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    }

    /**
     * Validate that a string has minimum length.
     */
    public static void requireMinLength(String value, int minLength, String fieldName) {
        if (value == null || value.length() < minLength) {
            throw new BadRequestException(fieldName + " must be at least " + minLength + " characters");
        }
    }

    /**
     * Validate that a string has maximum length.
     */
    public static void requireMaxLength(String value, int maxLength, String fieldName) {
        if (value != null && value.length() > maxLength) {
            throw new BadRequestException(fieldName + " must be less than " + maxLength + " characters");
        }
    }
}
