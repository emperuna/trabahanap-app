package com.trabahanap.service;

import com.trabahanap.config.JwtUtil;
import com.trabahanap.dto.request.LoginRequest;
import com.trabahanap.dto.request.SignupRequest;
import com.trabahanap.dto.response.JwtResponse;
import com.trabahanap.dto.response.MessageResponse;
import com.trabahanap.dto.response.UserInfoResponse;
import com.trabahanap.model.ERole;
import com.trabahanap.model.Role;
import com.trabahanap.model.User;
import com.trabahanap.repository.RoleRepository;
import com.trabahanap.repository.UserRepository;
import com.trabahanap.exception.BadRequestException;
import com.trabahanap.exception.ResourceNotFoundException;
import com.trabahanap.security.UserPrincipal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.servlet.http.HttpServletRequest;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service layer for authentication operations.
 */
@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    /**
     * Authenticate user and return JWT token.
     */
    public JwtResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String jwt = jwtUtil.generateToken(userPrincipal);

        List<String> roles = userPrincipal.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return new JwtResponse(
                jwt,
                userPrincipal.getId(),
                userPrincipal.getUsername(),
                userPrincipal.getEmail(),
                roles);
    }

    /**
     * Register a new user.
     */
    @Transactional
    public MessageResponse register(SignupRequest signUpRequest) {
        // Check if username exists
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new BadRequestException("Username is already taken!");
        }

        // Check if email exists
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Email is already in use!");
        }

        // Create new user
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                passwordEncoder.encode(signUpRequest.getPassword()));

        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setPhoneNumber(signUpRequest.getPhoneNumber());

        // Assign roles
        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null || strRoles.isEmpty()) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Default role not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role.toLowerCase()) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Admin role not found."));
                        roles.add(adminRole);
                        break;
                    case "employer":
                        Role empRole = roleRepository.findByName(ERole.ROLE_EMPLOYER)
                                .orElseThrow(() -> new RuntimeException("Error: Employer role not found."));
                        roles.add(empRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: User role not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return new MessageResponse("User registered successfully!");
    }

    /**
     * Get current authenticated user info.
     */
    public UserInfoResponse getCurrentUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        List<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toList());

        return new UserInfoResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhone(),
                roles);
    }

    /**
     * Refresh JWT token.
     */
    public JwtResponse refreshToken(HttpServletRequest request) {
        String token = jwtUtil.getJwtFromRequest(request);

        if (token == null) {
            throw new BadRequestException("Invalid token");
        }

        try {
            String username = jwtUtil.getUsernameFromToken(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtUtil.validateToken(token, userDetails)) {
                String newToken = jwtUtil.generateToken((UserPrincipal) userDetails);
                UserPrincipal userPrincipal = (UserPrincipal) userDetails;

                List<String> roles = userPrincipal.getAuthorities().stream()
                        .map(item -> item.getAuthority())
                        .collect(Collectors.toList());

                return new JwtResponse(
                        newToken,
                        userPrincipal.getId(),
                        userPrincipal.getUsername(),
                        userPrincipal.getEmail(),
                        roles);
            }
        } catch (Exception e) {
            throw new BadRequestException("Invalid token");
        }

        throw new BadRequestException("Invalid token");
    }
}
