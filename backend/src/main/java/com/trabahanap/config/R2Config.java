package com.trabahanap.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

import java.net.URI;

/**
 * Configuration for Cloudflare R2 storage.
 * Only activated when app.storage.type=r2
 */
@Configuration
@ConditionalOnProperty(name = "app.storage.type", havingValue = "r2")
public class R2Config {

    @Value("${app.r2.endpoint}")
    private String endpoint;

    @Value("${app.r2.access-key}")
    private String accessKey;

    @Value("${app.r2.secret-key}")
    private String secretKey;

    @Bean
    public S3Client s3Client() {
        // Validate configuration
        if (endpoint == null || endpoint.trim().isEmpty()) {
            throw new IllegalStateException("R2_ENDPOINT is required when STORAGE_TYPE=r2");
        }
        if (accessKey == null || accessKey.trim().isEmpty()) {
            throw new IllegalStateException("R2_ACCESS_KEY is required when STORAGE_TYPE=r2");
        }
        if (secretKey == null || secretKey.trim().isEmpty()) {
            throw new IllegalStateException("R2_SECRET_KEY is required when STORAGE_TYPE=r2");
        }

        return S3Client.builder()
                .endpointOverride(URI.create(endpoint))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(accessKey, secretKey)))
                .region(Region.of("auto")) // R2 uses 'auto' region
                .forcePathStyle(true) // Required for R2 compatibility
                .build();
    }
}
