package com.trabahanap.repository;

import com.trabahanap.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    
    @Query("SELECT ja FROM JobApplication ja JOIN FETCH ja.job JOIN FETCH ja.applicant WHERE ja.applicant.id = :applicantId ORDER BY ja.appliedAt DESC")
    List<JobApplication> findByApplicantIdWithDetails(@Param("applicantId") Long applicantId);
    
    @Query("SELECT ja FROM JobApplication ja JOIN FETCH ja.job JOIN FETCH ja.applicant WHERE ja.job.postedBy.id = :employerId ORDER BY ja.appliedAt DESC")
    List<JobApplication> findByEmployerIdWithDetails(@Param("employerId") Long employerId);
    
    @Query("SELECT ja FROM JobApplication ja WHERE ja.job.id = :jobId AND ja.applicant.id = :applicantId")
    Optional<JobApplication> findByJobIdAndApplicantId(@Param("jobId") Long jobId, @Param("applicantId") Long applicantId);
    
    boolean existsByJobIdAndApplicantId(Long jobId, Long applicantId);
}
