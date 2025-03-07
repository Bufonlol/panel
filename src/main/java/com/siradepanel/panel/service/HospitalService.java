package com.siradepanel.panel.service;


import com.siradepanel.panel.dto.HospitalRequest;
import com.siradepanel.panel.dto.HospitalResponse;
import com.siradepanel.panel.entity.Hospital;
import com.siradepanel.panel.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HospitalService {
    private final HospitalRepository hospitalRepository;
    private final ActivityLogService activityLogService;

    public List<HospitalResponse> getAllHospitals() {
        return hospitalRepository.findAll().stream()
                .map(this::mapToHospitalResponse)
                .collect(Collectors.toList());
    }

    public List<HospitalResponse> getAllActiveHospitals() {
        return hospitalRepository.findByActiveTrue().stream()
                .map(this::mapToHospitalResponse)
                .collect(Collectors.toList());
    }

    public HospitalResponse getHospitalById(Long id) {
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hospital not found with id: " + id));
        return mapToHospitalResponse(hospital);
    }

    @Transactional
    public HospitalResponse createHospital(HospitalRequest hospitalRequest, Long userId, String ipAddress) {
        if (hospitalRepository.existsByName(hospitalRequest.getName())) {
            throw new RuntimeException("Hospital name already exists");
        }

        Hospital hospital = new Hospital();
        mapHospitalRequestToHospital(hospitalRequest, hospital);

        Hospital savedHospital = hospitalRepository.save(hospital);

        // Log activity
        activityLogService.logActivity(
                userId,
                "Hospital Creation",
                "Created hospital: " + savedHospital.getName(),
                ipAddress
        );

        return mapToHospitalResponse(savedHospital);
    }

    @Transactional
    public HospitalResponse updateHospital(Long id, HospitalRequest hospitalRequest, Long userId, String ipAddress) {
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hospital not found with id: " + id));

        // Check if name is being changed and if it already exists
        if (!hospital.getName().equals(hospitalRequest.getName()) &&
                hospitalRepository.existsByName(hospitalRequest.getName())) {
            throw new RuntimeException("Hospital name already exists");
        }

        mapHospitalRequestToHospital(hospitalRequest, hospital);

        Hospital updatedHospital = hospitalRepository.save(hospital);

        // Log activity
        activityLogService.logActivity(
                userId,
                "Hospital Update",
                "Updated hospital: " + updatedHospital.getName(),
                ipAddress
        );

        return mapToHospitalResponse(updatedHospital);
    }

    @Transactional
    public void deleteHospital(Long id, Long userId, String ipAddress) {
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hospital not found with id: " + id));

        // Instead of hard delete, we'll set active to false
        hospital.setActive(false);
        hospitalRepository.save(hospital);

        // Log activity
        activityLogService.logActivity(
                userId,
                "Hospital Deletion",
                "Deactivated hospital: " + hospital.getName(),
                ipAddress
        );
    }

    private void mapHospitalRequestToHospital(HospitalRequest request, Hospital hospital) {
        hospital.setName(request.getName());
        hospital.setAddress(request.getAddress());
        hospital.setCity(request.getCity());
        hospital.setState(request.getState());
        hospital.setZipCode(request.getZipCode());
        hospital.setPhoneNumber(request.getPhoneNumber());
        hospital.setEmail(request.getEmail());

        if (request.getActive() != null) {
            hospital.setActive(request.getActive());
        }
    }

    private HospitalResponse mapToHospitalResponse(Hospital hospital) {
        HospitalResponse response = new HospitalResponse();
        response.setId(hospital.getId());
        response.setName(hospital.getName());
        response.setAddress(hospital.getAddress());
        response.setCity(hospital.getCity());
        response.setState(hospital.getState());
        response.setZipCode(hospital.getZipCode());
        response.setPhoneNumber(hospital.getPhoneNumber());
        response.setEmail(hospital.getEmail());
        response.setUserCount(hospital.getUsers().size());
        response.setCreatedAt(hospital.getCreatedAt());
        response.setUpdatedAt(hospital.getUpdatedAt());
        response.setActive(hospital.isActive());
        return response;
    }
}