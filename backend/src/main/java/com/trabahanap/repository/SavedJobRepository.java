package com.trabahanap.repository;

import com.trabahanap.model.SavedJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {
    
    @Query("SELECT sj FROM SavedJob sj JOIN FETCH sj.job j JOIN FETCH j.postedBy WHERE sj.user.id = :userId ORDER BY sj.savedAt DESC")
    List<SavedJob> findByUserIdWithJobDetails(@Param("userId") Long userId);
    
    Optional<SavedJob> findByUserIdAndJobId(Long userId, Long jobId);
    
    boolean existsByUserIdAndJobId(Long userId, Long jobId);
    
    void deleteByUserIdAndJobId(Long userId, Long jobId);
    
    long countByUserId(Long userId);
}