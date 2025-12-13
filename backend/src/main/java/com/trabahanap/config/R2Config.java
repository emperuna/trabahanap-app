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

    @Value("${app.r2.endpoint:}")
    private String endpoint;

    @Value("${app.r2.access-key:}")
    private String accessKey;

    @Value("${app.r2.secret-key:}")
    private String secretKey;

    @Bean
    public S3Client s3Client() {
        // Validate configuration - log errors but don't crash
        if (endpoint == null || endpoint.trim().isEmpty()) {
            System.err.println("⚠️ R2_ENDPOINT is not set. R2 storage will not work.");
            System.err.println("   Set STORAGE_TYPE=local or configure R2_ENDPOINT properly.");
            return createDummyClient();
        }
        if (accessKey == null || accessKey.trim().isEmpty()) {
            System.err.println("⚠️ R2_ACCESS_KEY is not set. R2 storage will not work.");
            return createDummyClient();
        }
        if (secretKey == null || secretKey.trim().isEmpty()) {
            System.err.println("⚠️ R2_SECRET_KEY is not set. R2 storage will not work.");
            return createDummyClient();
        }

        try {
            S3Client client = S3Client.builder()
                    .endpointOverride(URI.create(endpoint))
                    .credentialsProvider(StaticCredentialsProvider.create(
                            AwsBasicCredentials.create(accessKey, secretKey)))
                    .region(Region.of("auto")) // R2 uses 'auto' region
                    .forcePathStyle(true) // Required for R2 compatibility
                    .build();

            System.out.println("✅ R2 S3Client configured successfully");
            return client;
        } catch (Exception e) {
            System.err.println("⚠️ Failed to create R2 S3Client: " + e.getMessage());
            System.err.println("   Check your R2_ENDPOINT format (should be https://...)");
            return createDummyClient();
        }
    }

    /**
     * Creates a dummy S3Client that will fail gracefully on operations.
     * This allows the app to start even with bad R2 config.
     */
    private S3Client createDummyClient() {
        System.err.println("⚠️ Using dummy S3Client - file uploads will fail!");
        System.err.println("   Fix your R2 configuration or set STORAGE_TYPE=local");

        // Return a client that will fail on use but won't crash on creation
        try {
            return S3Client.builder()
                    .endpointOverride(URI.create("https://dummy.r2.cloudflarestorage.com"))
                    .credentialsProvider(StaticCredentialsProvider.create(
                            AwsBasicCredentials.create("dummy", "dummy")))
                    .region(Region.of("auto"))
                    .forcePathStyle(true)
                    .build();
        } catch (Exception e) {
            // Last resort - this should never happen
            return null;
        }
    }
}
