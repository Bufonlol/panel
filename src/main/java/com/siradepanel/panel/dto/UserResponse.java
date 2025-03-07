package com.siradepanel.panel.dto;

import com.siradepanel.panel.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Long id;
    private String firstName;
    private String paternalLastName;
    private String maternalLastName;
    private String email;
    private String employeeCode;
    private UserRole role;
    private String specialty;
    private Long hospitalId;
    private String hospitalName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean active;
}