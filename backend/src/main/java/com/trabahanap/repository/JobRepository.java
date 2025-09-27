package com.trabahanap.repository;

import com.trabahanap.model.Job;
import com.trabahanap.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    
    // Find jobs by employer ordered by creation date (newest first)
    List<Job> findByPostedByOrderByCreatedAtDesc(User postedBy);
    
    // Alternative if postedBy field name is different in your Job model
    // List<Job> findByUserOrderByCreatedAtDesc(User user);
    
    // Additional useful queries for job management
    @Query("SELECT j FROM Job j WHERE j.postedBy.id = :employerId ORDER BY j.createdAt DESC")
    List<Job> findJobsByEmployerId(@Param("employerId") Long employerId);
    
    // Count jobs by employer
    long countByPostedBy(User postedBy);
    
    // Find active jobs by employer (if you add active field later)
    // List<Job> findByPostedByAndActiveOrderByCreatedAtDesc(User postedBy, Boolean active);
}
