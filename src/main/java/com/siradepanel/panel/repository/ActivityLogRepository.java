package com.siradepanel.panel.repository;


import com.siradepanel.panel.entity.ActivityLog;
import com.siradepanel.panel.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    List<ActivityLog> findByUser(User user);
    List<ActivityLog> findByTimestampBetween(LocalDateTime start, LocalDateTime end);
}
