package com.siradepanel.panel.controller;

import com.siradepanel.panel.dto.HospitalRequest;
import com.siradepanel.panel.dto.HospitalResponse;
import com.siradepanel.panel.security.UserDetailsImpl;
import com.siradepanel.panel.service.HospitalService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitals")
@RequiredArgsConstructor
public class HospitalController {
    private final HospitalService hospitalService;

    @GetMapping
    public ResponseEntity<List<HospitalResponse>> getAllHospitals() {
        return ResponseEntity.ok(hospitalService.getAllHospitals());
    }

    @GetMapping("/active")
    public ResponseEntity<List<HospitalResponse>> getAllActiveHospitals() {
        return ResponseEntity.ok(hospitalService.getAllActiveHospitals());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HospitalResponse> getHospitalById(@PathVariable Long id) {
        return ResponseEntity.ok(hospitalService.getHospitalById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HospitalResponse> createHospital(@Valid @RequestBody HospitalRequest hospitalRequest,
                                                           @AuthenticationPrincipal UserDetailsImpl currentUser,
                                                           HttpServletRequest request) {
        return ResponseEntity.ok(hospitalService.createHospital(hospitalRequest, currentUser.getId(), request.getRemoteAddr()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HospitalResponse> updateHospital(@PathVariable Long id,
                                                           @Valid @RequestBody HospitalRequest hospitalRequest,
                                                           @AuthenticationPrincipal UserDetailsImpl currentUser,
                                                           HttpServletRequest request) {
        return ResponseEntity.ok(hospitalService.updateHospital(id, hospitalRequest, currentUser.getId(), request.getRemoteAddr()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteHospital(@PathVariable Long id,
                                               @AuthenticationPrincipal UserDetailsImpl currentUser,
                                               HttpServletRequest request) {
        hospitalService.deleteHospital(id, currentUser.getId(), request.getRemoteAddr());
        return ResponseEntity.noContent().build();
    }
}