package com.trabahanap.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.trabahanap.model.UserResume;

@Repository
public interface UserResumeRepository extends JpaRepository<UserResume, Long> {
    
    // Find all resumes for a specific user
    List<UserResume> findByUserIdOrderByUploadedAtDesc(Long userId);
    
    // Find a resume by ID and user ID (for security)
    Optional<UserResume> findByIdAndUserId(Long id, Long userId);
    
    // Find default resume for a user
    Optional<UserResume> findByUserIdAndIsDefaultTrue(Long userId);
    
    // Check if user has any resumes
    boolean existsByUserId(Long userId);
    
    // Count resumes for a user
    long countByUserId(Long userId);
    
    // Remove default flag from all user's resumes
    @Modifying
    @Query("UPDATE UserResume ur SET ur.isDefault = false WHERE ur.user.id = :userId")
    void removeDefaultFlagFromAllResumes(@Param("userId") Long userId);
}
