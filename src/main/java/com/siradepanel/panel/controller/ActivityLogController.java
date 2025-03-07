package com.siradepanel.panel.controller;

import com.siradepanel.panel.dto.ActivityLogResponse;
import com.siradepanel.panel.service.ActivityLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/activity-logs")
@RequiredArgsConstructor
public class ActivityLogController {
    private final ActivityLogService activityLogService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ActivityLogResponse>> getAllActivityLogs() {
        return ResponseEntity.ok(activityLogService.getAllActivityLogs());
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('HOSPITAL_COORDINATOR') or @userSecurity.isCurrentUser(#userId, authentication)")
    public ResponseEntity<List<ActivityLogResponse>> getUserActivityLogs(@PathVariable Long userId) {
        return ResponseEntity.ok(activityLogService.getUserActivityLogs(userId));
    }

    @GetMapping("/date-range")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ActivityLogResponse>> getActivityLogsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return ResponseEntity.ok(activityLogService.getActivityLogsByDateRange(startDate, endDate));
    }
}