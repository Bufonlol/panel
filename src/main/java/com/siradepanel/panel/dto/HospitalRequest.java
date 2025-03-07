package com.siradepanel.panel.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HospitalRequest {
    @NotBlank(message = "Hospital name is required")
    private String name;

    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String phoneNumber;

    @Email(message = "Email should be valid")
    private String email;

    private Boolean active;
}