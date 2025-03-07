package com.siradepanel.panel.service;

import com.siradepanel.panel.dto.UserRequest;
import com.siradepanel.panel.dto.UserResponse;
import com.siradepanel.panel.entity.Hospital;
import com.siradepanel.panel.entity.User;
import com.siradepanel.panel.repository.HospitalRepository;
import com.siradepanel.panel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final HospitalRepository hospitalRepository;
    private final PasswordEncoder passwordEncoder;
    private final ActivityLogService activityLogService;

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return mapToUserResponse(user);
    }

    @Transactional
    public UserResponse createUser(UserRequest userRequest, Long currentUserId, String ipAddress) {
        if (userRepository.existsByEmail(userRequest.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }

        User user = new User();
        mapUserRequestToUser(userRequest, user);

        // Always encode password for new users
        if (userRequest.getPassword() != null && !userRequest.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        } else {
            // Set a default password if none provided
            user.setPassword(passwordEncoder.encode("ChangeMe123!"));
        }

        User savedUser = userRepository.save(user);

        // Log activity
        activityLogService.logActivity(
                currentUserId,
                "User Creation",
                "Created user: " + savedUser.getEmail(),
                ipAddress
        );

        return mapToUserResponse(savedUser);
    }

    @Transactional
    public UserResponse updateUser(Long id, UserRequest userRequest, Long currentUserId, String ipAddress) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Check if email is being changed and if it already exists
        if (!user.getEmail().equals(userRequest.getEmail()) &&
                userRepository.existsByEmail(userRequest.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }

        mapUserRequestToUser(userRequest, user);

        // Only update password if provided
        if (userRequest.getPassword() != null && !userRequest.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        }

        User updatedUser = userRepository.save(user);

        // Log activity
        activityLogService.logActivity(
                currentUserId,
                "User Update",
                "Updated user: " + updatedUser.getEmail(),
                ipAddress
        );

        return mapToUserResponse(updatedUser);
    }

    @Transactional
    public void deleteUser(Long id, Long currentUserId, String ipAddress) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Instead of hard delete, we'll set active to false
        user.setActive(false);
        userRepository.save(user);

        // Log activity
        activityLogService.logActivity(
                currentUserId,
                "User Deletion",
                "Deactivated user: " + user.getEmail(),
                ipAddress
        );
    }

    public List<UserResponse> getUsersByHospital(Long hospitalId) {
        Hospital hospital = hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> new RuntimeException("Hospital not found with id: " + hospitalId));

        return userRepository.findByHospital(hospital).stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    private void mapUserRequestToUser(UserRequest request, User user) {
        user.setFirstName(request.getFirstName());
        user.setPaternalLastName(request.getPaternalLastName());
        user.setMaternalLastName(request.getMaternalLastName());
        user.setEmail(request.getEmail());
        user.setEmployeeCode(request.getEmployeeCode());
        user.setRole(request.getRole());
        user.setSpecialty(request.getSpecialty());

        if (request.getActive() != null) {
            user.setActive(request.getActive());
        }

        if (request.getHospitalId() != null) {
            Hospital hospital = hospitalRepository.findById(request.getHospitalId())
                    .orElseThrow(() -> new RuntimeException("Hospital not found with id: " + request.getHospitalId()));
            user.setHospital(hospital);
        } else {
            user.setHospital(null);
        }
    }

    private UserResponse mapToUserResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setFirstName(user.getFirstName());
        response.setPaternalLastName(user.getPaternalLastName());
        response.setMaternalLastName(user.getMaternalLastName());
        response.setEmail(user.getEmail());
        response.setEmployeeCode(user.getEmployeeCode());
        response.setRole(user.getRole());
        response.setSpecialty(user.getSpecialty());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());
        response.setActive(user.isActive());

        if (user.getHospital() != null) {
            response.setHospitalId(user.getHospital().getId());
            response.setHospitalName(user.getHospital().getName());
        }

        return response;
    }
}