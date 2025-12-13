package com.trabahanap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

/**
 * Facade service for file storage operations.
 * Delegates to either R2 (cloud) or local filesystem based on configuration.
 */
@Service
public class FileStorageService {

    private final String storageType;
    private final Path fileStorageLocation;
    private final Optional<R2StorageService> r2StorageService;

    @Autowired
    public FileStorageService(
            @Value("${app.storage.type:local}") String storageType,
            @Value("${app.upload-dir:uploads}") String uploadDir,
            Optional<R2StorageService> r2StorageService) {
        this.storageType = storageType;
        this.r2StorageService = r2StorageService;
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();

        // Only create local directory if using local storage
        if ("local".equals(storageType)) {
            try {
                Files.createDirectories(this.fileStorageLocation);
            } catch (Exception ex) {
                throw new RuntimeException("Could not create upload directory.", ex);
            }
        }
    }

    /**
     * Store a file in the configured storage backend.
     *
     * @param file   The file to store
     * @param folder The folder/prefix for the file
     * @return The file path or object key
     */
    public String storeFile(MultipartFile file, String folder) {
        // Use R2 storage if configured
        if (isR2Enabled()) {
            return r2StorageService.get().uploadFile(file, folder);
        }

        // Fall back to local storage
        return storeFileLocally(file, folder);
    }

    /**
     * Load a file as a Resource for download.
     *
     * @param filePath The file path or object key
     * @return The file as a Resource
     */
    public Resource loadFileAsResource(String filePath) {
        // Use R2 storage if configured
        if (isR2Enabled()) {
            byte[] fileBytes = r2StorageService.get().downloadFile(filePath);
            return new ByteArrayResource(fileBytes) {
                @Override
                public String getFilename() {
                    // Extract filename from path
                    return filePath.contains("/")
                            ? filePath.substring(filePath.lastIndexOf("/") + 1)
                            : filePath;
                }
            };
        }

        // Fall back to local storage
        return loadFileFromLocal(filePath);
    }

    /**
     * Delete a file from storage.
     *
     * @param filePath The file path or object key to delete
     */
    public void deleteFile(String filePath) {
        if (isR2Enabled()) {
            r2StorageService.get().deleteFile(filePath);
        } else {
            deleteFileLocally(filePath);
        }
    }

    /**
     * Get the public URL for a file.
     * For R2, returns the public URL. For local, returns the relative path.
     *
     * @param filePath The file path or object key
     * @return The URL or path for accessing the file
     */
    public String getFileUrl(String filePath) {
        if (isR2Enabled()) {
            return r2StorageService.get().getFileUrl(filePath);
        }
        // For local storage, return the relative path
        return filePath;
    }

    /**
     * Check if R2 storage is enabled and available.
     */
    private boolean isR2Enabled() {
        return "r2".equals(storageType) && r2StorageService.isPresent();
    }

    /**
     * Store a file in the local filesystem.
     */
    private String storeFileLocally(MultipartFile file, String folder) {
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isEmpty()) {
            originalFilename = "file.pdf";
        }
        String fileName = StringUtils.cleanPath(originalFilename);

        try {
            if (fileName.contains("..")) {
                throw new RuntimeException("Invalid file name: " + fileName);
            }

            // Create folder
            Path folderPath = this.fileStorageLocation.resolve(folder);
            Files.createDirectories(folderPath);

            // Generate unique filename
            String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
            Path targetLocation = folderPath.resolve(uniqueFileName);

            // Save file
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return folder + "/" + uniqueFileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName, ex);
        }
    }

    /**
     * Load a file from the local filesystem as a Resource.
     */
    private Resource loadFileFromLocal(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("File not found " + fileName, ex);
        }
    }

    /**
     * Delete a file from the local filesystem.
     */
    private void deleteFileLocally(String filePath) {
        try {
            Path path = this.fileStorageLocation.resolve(filePath).normalize();
            Files.deleteIfExists(path);
        } catch (IOException e) {
            System.err.println("Failed to delete local file: " + filePath + " - " + e.getMessage());
        }
    }
}