package com.trabahanap.util;

/**
 * Application-wide constants.
 */
public final class Constants {

    private Constants() {
        // Prevent instantiation
    }

    // === Roles ===
    public static final String ROLE_JOBSEEKER = "ROLE_JOBSEEKER";
    public static final String ROLE_EMPLOYER = "ROLE_EMPLOYER";
    public static final String ROLE_ADMIN = "ROLE_ADMIN";

    // === Application Statuses ===
    public static final String STATUS_PENDING = "PENDING";
    public static final String STATUS_REVIEWING = "REVIEWING";
    public static final String STATUS_SHORTLISTED = "SHORTLISTED";
    public static final String STATUS_ACCEPTED = "ACCEPTED";
    public static final String STATUS_REJECTED = "REJECTED";
    public static final String STATUS_WITHDRAWN = "WITHDRAWN";

    // === Job Statuses ===
    public static final String JOB_STATUS_ACTIVE = "ACTIVE";
    public static final String JOB_STATUS_CLOSED = "CLOSED";
    public static final String JOB_STATUS_DRAFT = "DRAFT";

    // === File Limits ===
    public static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    public static final String[] ALLOWED_FILE_TYPES = { "application/pdf" };

    // === Pagination Defaults ===
    public static final int DEFAULT_PAGE_SIZE = 10;
    public static final int MAX_PAGE_SIZE = 100;

    // === JWT ===
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
}
