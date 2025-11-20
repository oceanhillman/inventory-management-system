package com.project1.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project1.backend.dtos.ActivityLogDto;
import com.project1.backend.mappers.ActivityLogMapper;
import com.project1.backend.models.ActivityLog;
import com.project1.backend.repositories.ActivityLogRepository;

@Service
public class ActivityLogService {

    private final ActivityLogRepository repository;
    public ActivityLogService(ActivityLogRepository repository) {
        this.repository = repository;
    }

    public void log(String action, String details) {
        ActivityLog log = new ActivityLog();
        log.setAction(action);
        log.setDetails(details);

        repository.save(log);
    }

    public List<ActivityLogDto> getRecentActivity() {
        return repository.findTop50ByOrderByCreatedAtDesc()
            .stream()
            .map(log -> ActivityLogMapper.toDto(log))
            .toList();
    }
}
