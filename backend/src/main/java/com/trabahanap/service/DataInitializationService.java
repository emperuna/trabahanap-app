package com.trabahanap.service;

import com.trabahanap.model.ERole;
import com.trabahanap.model.Role;
import com.trabahanap.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializationService implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        initializeRoles();
    }

    private void initializeRoles() {
        if (roleRepository.count() == 0) {
            Role userRole = new Role(ERole.ROLE_USER);
            Role employerRole = new Role(ERole.ROLE_EMPLOYER);
            Role adminRole = new Role(ERole.ROLE_ADMIN);

            roleRepository.save(userRole);
            roleRepository.save(employerRole);
            roleRepository.save(adminRole);

            System.out.println("Default roles have been created.");
        }
    }
}
