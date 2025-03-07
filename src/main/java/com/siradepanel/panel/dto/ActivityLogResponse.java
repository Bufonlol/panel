package com.siradepanel.panel.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityLogResponse {
    private Long id;
    private Long userId;
    private String userName;
    private String action;
    private String details;
    private String ipAddress;
    private LocalDateTime timestamp;
}