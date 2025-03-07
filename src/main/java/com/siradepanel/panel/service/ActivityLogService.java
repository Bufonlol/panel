package com.siradepanel.panel.service;


import com.siradepanel.panel.dto.ActivityLogResponse;
import com.siradepanel.panel.entity.ActivityLog;
import com.siradepanel.panel.entity.User;
import com.siradepanel.panel.repository.ActivityLogRepository;
import com.siradepanel.panel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityLogService {
    private final ActivityLogRepository activityLogRepository;
    private final UserRepository userRepository;

    public void logActivity(Long userId, String action, String details, String ipAddress) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        ActivityLog log = new ActivityLog();
        log.setUser(user);
        log.setAction(action);
        log.setDetails(details);
        log.setIpAddress(ipAddress);

        activityLogRepository.save(log);
    }

    public void logSystemActivity(String action, String details, String ipAddress) {
        ActivityLog log = new ActivityLog();
        log.setAction(action);
        log.setDetails(details);
        log.setIpAddress(ipAddress);

        activityLogRepository.save(log);
    }

    public List<ActivityLogResponse> getUserActivityLogs(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        return activityLogRepository.findByUser(user).stream()
                .map(this::mapToActivityLogResponse)
                .collect(Collectors.toList());
    }

    public List<ActivityLogResponse> getActivityLogsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return activityLogRepository.findByTimestampBetween(startDate, endDate).stream()
                .map(this::mapToActivityLogResponse)
                .collect(Collectors.toList());
    }

    public List<ActivityLogResponse> getAllActivityLogs() {
        return activityLogRepository.findAll().stream()
                .map(this::mapToActivityLogResponse)
                .collect(Collectors.toList());
    }

    private ActivityLogResponse mapToActivityLogResponse(ActivityLog log) {
        ActivityLogResponse response = new ActivityLogResponse();
        response.setId(log.getId());

        if (log.getUser() != null) {
            response.setUserId(log.getUser().getId());
            response.setUserName(log.getUser().getFirstName() + " " + log.getUser().getPaternalLastName());
        }

        response.setAction(log.getAction());
        response.setDetails(log.getDetails());
        response.setIpAddress(log.getIpAddress());
        response.setTimestamp(log.getTimestamp());

        return response;
    }
}