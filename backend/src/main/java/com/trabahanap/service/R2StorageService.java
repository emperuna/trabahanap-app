package com.trabahanap.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.util.UUID;

/**
 * Service for storing files in Cloudflare R2 (S3-compatible storage).
 * Only activated when app.storage.type=r2
 */
@Service
@ConditionalOnProperty(name = "app.storage.type", havingValue = "r2")
public class R2StorageService {

    private final S3Client s3Client;
    private final String bucketName;
    private final String publicUrl;

    public R2StorageService(
            S3Client s3Client,
            @Value("${app.r2.bucket}") String bucketName,
            @Value("${app.r2.public-url:}") String publicUrl) {
        this.s3Client = s3Client;
        this.bucketName = bucketName;
        this.publicUrl = publicUrl;

        // Ensure bucket exists on startup
        ensureBucketExists();
    }

    /**
     * Upload a file to R2 storage.
     *
     * @param file   The file to upload
     * @param folder The folder/prefix for the file
     * @return The object key (path) of the uploaded file
     */
    public String uploadFile(MultipartFile file, String folder) {
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());

        if (originalFilename.contains("..")) {
            throw new RuntimeException("Invalid file name: " + originalFilename);
        }

        // Generate unique filename
        String uniqueFileName = UUID.randomUUID().toString() + "_" + originalFilename;
        String objectKey = folder + "/" + uniqueFileName;

        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(objectKey)
                    .contentType(file.getContentType())
                    .contentLength(file.getSize())
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(
                    file.getInputStream(), file.getSize()));

            return objectKey;
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file to R2: " + originalFilename, e);
        }
    }

    /**
     * Download a file from R2 storage.
     *
     * @param objectKey The object key (path) of the file
     * @return The file content as bytes
     */
    public byte[] downloadFile(String objectKey) {
        try {
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(objectKey)
                    .build();

            return s3Client.getObjectAsBytes(getObjectRequest).asByteArray();
        } catch (NoSuchKeyException e) {
            throw new RuntimeException("File not found in R2: " + objectKey, e);
        }
    }

    /**
     * Delete a file from R2 storage.
     *
     * @param objectKey The object key (path) of the file to delete
     */
    public void deleteFile(String objectKey) {
        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(objectKey)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);
        } catch (S3Exception e) {
            // Log but don't fail - file may already be deleted
            System.err.println("Failed to delete file from R2: " + objectKey + " - " + e.getMessage());
        }
    }

    /**
     * Get the public URL for a file in R2.
     * If a public URL is configured, returns a direct URL.
     * Otherwise, returns the object key for internal use.
     *
     * @param objectKey The object key (path) of the file
     * @return The public URL or object key
     */
    public String getFileUrl(String objectKey) {
        if (publicUrl != null && !publicUrl.isEmpty()) {
            // Remove trailing slash if present
            String baseUrl = publicUrl.endsWith("/") ? publicUrl.substring(0, publicUrl.length() - 1) : publicUrl;
            return baseUrl + "/" + objectKey;
        }
        // Return object key if no public URL configured
        return objectKey;
    }

    /**
     * Check if a file exists in R2 storage.
     *
     * @param objectKey The object key (path) of the file
     * @return true if the file exists, false otherwise
     */
    public boolean fileExists(String objectKey) {
        try {
            HeadObjectRequest headObjectRequest = HeadObjectRequest.builder()
                    .bucket(bucketName)
                    .key(objectKey)
                    .build();

            s3Client.headObject(headObjectRequest);
            return true;
        } catch (NoSuchKeyException e) {
            return false;
        }
    }

    /**
     * Ensure the bucket exists, create if it doesn't.
     */
    private void ensureBucketExists() {
        try {
            HeadBucketRequest headBucketRequest = HeadBucketRequest.builder()
                    .bucket(bucketName)
                    .build();
            s3Client.headBucket(headBucketRequest);
        } catch (NoSuchBucketException e) {
            // Bucket doesn't exist, create it
            CreateBucketRequest createBucketRequest = CreateBucketRequest.builder()
                    .bucket(bucketName)
                    .build();
            s3Client.createBucket(createBucketRequest);
            System.out.println("Created R2 bucket: " + bucketName);
        }
    }
}
