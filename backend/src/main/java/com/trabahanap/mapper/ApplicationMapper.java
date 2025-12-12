package com.trabahanap.mapper;

import com.trabahanap.dto.response.ApplicationDTO;
import com.trabahanap.model.JobApplication;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper for JobApplication entity to DTO conversions.
 */
public class ApplicationMapper {

    private ApplicationMapper() {
        // Prevent instantiation
    }

    /**
     * Convert JobApplication entity to ApplicationDTO.
     */
    public static ApplicationDTO toDTO(JobApplication application) {
        return ApplicationDTO.fromApplication(application);
    }

    /**
     * Convert list of JobApplication entities to list of ApplicationDTOs.
     */
    public static List<ApplicationDTO> toDTOList(List<JobApplication> applications) {
        return applications.stream()
                .map(ApplicationMapper::toDTO)
                .collect(Collectors.toList());
    }
}
