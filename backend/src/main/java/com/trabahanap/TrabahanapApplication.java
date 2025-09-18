package com.trabahanap;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.trabahanap.model.ERole;
import com.trabahanap.model.Role;
import com.trabahanap.model.User;
import com.trabahanap.repository.RoleRepository;
import com.trabahanap.repository.UserRepository;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class TrabahanapApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        // ✅ Load .env file before starting Spring
        Dotenv dotenv = Dotenv.configure()
                .directory("./")
                .ignoreIfMalformed()
                .ignoreIfMissing()
                .load();
        
        // Set system properties from .env file
        dotenv.entries().forEach(entry -> {
            System.setProperty(entry.getKey(), entry.getValue());
        });
        
        SpringApplication.run(TrabahanapApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("=== INITIALIZING DATABASE ===");
        
        // Create roles if they don't exist
        createRoleIfNotExists(ERole.ROLE_USER);
        createRoleIfNotExists(ERole.ROLE_EMPLOYER);
        createRoleIfNotExists(ERole.ROLE_ADMIN);

        // Create test user only if it doesn't exist (important for Neon persistence)
        if (!userRepository.existsByUsername("testuser")) {
            User testUser = new User();
            testUser.setUsername("testuser");
            testUser.setEmail("test@example.com");
            testUser.setFirstName("Test");
            testUser.setLastName("User");
            testUser.setPassword(passwordEncoder.encode("password123"));
            
            Set<Role> roles = new HashSet<>();
            Role userRole = roleRepository.findByName(ERole.ROLE_USER).get();
            roles.add(userRole);
            testUser.setRoles(roles);
            
            userRepository.save(testUser);
            System.out.println("✅ Created test user: testuser / password123");
        } else {
            System.out.println("✅ Test user already exists in database");
        }
        
        System.out.println("=== DATABASE INITIALIZATION COMPLETE ===");
    }

    private void createRoleIfNotExists(ERole roleName) {
        if (!roleRepository.findByName(roleName).isPresent()) {
            Role role = new Role(roleName);
            roleRepository.save(role);
            System.out.println("✅ Created role: " + roleName);
        } else {
            System.out.println("✅ Role already exists: " + roleName);
        }
    }
}
