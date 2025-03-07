package com.siradepanel.panel.service;

import com.siradepanel.panel.dto.JwtResponse;
import com.siradepanel.panel.dto.LoginRequest;
import com.siradepanel.panel.dto.MessageResponse;
import com.siradepanel.panel.dto.SignupRequest;
import com.siradepanel.panel.entity.Hospital;
import com.siradepanel.panel.entity.User;
import com.siradepanel.panel.repository.HospitalRepository;
import com.siradepanel.panel.repository.UserRepository;
import com.siradepanel.panel.security.JwtTokenProvider;
import com.siradepanel.panel.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final HospitalRepository hospitalRepository;
    private final PasswordEncoder encoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final ActivityLogService activityLogService;

    public JwtResponse authenticateUser(LoginRequest loginRequest, String ipAddress) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtTokenProvider.generateToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Log the activity
        activityLogService.logActivity(
                userDetails.getId(),
                "User Login",
                "User logged in successfully",
                ipAddress
        );

        return new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getEmail(),
                userDetails.getFirstName(),
                userDetails.getPaternalLastName(),
                userDetails.getAuthorities().stream().findFirst().get().getAuthority().replace("ROLE_", "")
        );
    }

    public MessageResponse registerUser(SignupRequest signupRequest, String ipAddress) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return new MessageResponse("Error: Email is already in use!");
        }

        User user = new User();
        user.setFirstName(signupRequest.getFirstName());
        user.setPaternalLastName(signupRequest.getPaternalLastName());
        user.setMaternalLastName(signupRequest.getMaternalLastName());
        user.setEmail(signupRequest.getEmail());
        user.setEmployeeCode(signupRequest.getEmployeeCode());
        user.setPassword(encoder.encode(signupRequest.getPassword()));
        user.setRole(signupRequest.getRole());
        user.setSpecialty(signupRequest.getSpecialty());

        if (signupRequest.getHospitalId() != null) {
            Hospital hospital = hospitalRepository.findById(signupRequest.getHospitalId())
                    .orElseThrow(() -> new RuntimeException("Error: Hospital not found."));
            user.setHospital(hospital);
        }

        userRepository.save(user);

        // Log the activity (as system since the user is not yet authenticated)
        activityLogService.logSystemActivity(
                "User Registration",
                "New user registered: " + user.getEmail(),
                ipAddress
        );

        return new MessageResponse("User registered successfully!");
    }
}