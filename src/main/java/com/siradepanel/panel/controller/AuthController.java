package com.siradepanel.panel.controller;

import com.siradepanel.panel.dto.JwtResponse;
import com.siradepanel.panel.dto.LoginRequest;
import com.siradepanel.panel.dto.MessageResponse;
import com.siradepanel.panel.dto.SignupRequest;
import com.siradepanel.panel.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,
                                                        HttpServletRequest request) {
        return ResponseEntity.ok(authService.authenticateUser(loginRequest, request.getRemoteAddr()));
    }

    @PostMapping("/register")
    public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody SignupRequest signUpRequest,
                                                        HttpServletRequest request) {
        return ResponseEntity.ok(authService.registerUser(signUpRequest, request.getRemoteAddr()));
    }
}