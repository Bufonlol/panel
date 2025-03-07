package com.siradepanel.panel.controller;


import com.siradepanel.panel.dto.UserRequest;
import com.siradepanel.panel.dto.UserResponse;
import com.siradepanel.panel.security.UserDetailsImpl;
import com.siradepanel.panel.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('HOSPITAL_COORDINATOR')")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('HOSPITAL_COORDINATOR') or @userSecurity.isCurrentUser(#id, authentication)")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("/hospital/{hospitalId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('HOSPITAL_COORDINATOR')")
    public ResponseEntity<List<UserResponse>> getUsersByHospital(@PathVariable Long hospitalId) {
        return ResponseEntity.ok(userService.getUsersByHospital(hospitalId));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('HOSPITAL_COORDINATOR')")
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserRequest userRequest,
                                                   @AuthenticationPrincipal UserDetailsImpl currentUser,
                                                   HttpServletRequest request) {
        return ResponseEntity.ok(userService.createUser(userRequest, currentUser.getId(), request.getRemoteAddr()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('HOSPITAL_COORDINATOR') or @userSecurity.isCurrentUser(#id, authentication)")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id,
                                                   @Valid @RequestBody UserRequest userRequest,
                                                   @AuthenticationPrincipal UserDetailsImpl currentUser,
                                                   HttpServletRequest request) {
        return ResponseEntity.ok(userService.updateUser(id, userRequest, currentUser.getId(), request.getRemoteAddr()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('HOSPITAL_COORDINATOR')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id,
                                           @AuthenticationPrincipal UserDetailsImpl currentUser,
                                           HttpServletRequest request) {
        userService.deleteUser(id, currentUser.getId(), request.getRemoteAddr());
        return ResponseEntity.noContent().build();
    }
}