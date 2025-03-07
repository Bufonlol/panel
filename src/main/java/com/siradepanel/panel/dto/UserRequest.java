package com.siradepanel.panel.dto;


import com.siradepanel.panel.entity.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Paternal last name is required")
    private String paternalLastName;

    private String maternalLastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    private String employeeCode;

    private String password;

    @NotNull(message = "Role is required")
    private UserRole role;

    private String specialty;

    private Long hospitalId;

    private Boolean active;
}