package com.trabahanap.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnvironmentConfig {

    @Bean
    public Dotenv dotenv() {
        return Dotenv.configure()
                .directory("./")  // Look in the current directory (backend/)
                .ignoreIfMalformed()
                .ignoreIfMissing()
                .load();
    }
}