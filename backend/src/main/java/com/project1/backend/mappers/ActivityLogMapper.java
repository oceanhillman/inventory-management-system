package com.project1.backend.mappers;

import com.project1.backend.dtos.ActivityLogDto;
import com.project1.backend.models.ActivityLog;

public class ActivityLogMapper {
    public static ActivityLogDto toDto(ActivityLog log) {
        return new ActivityLogDto(
            log.getAction(),
            log.getDetails(),
            log.getCreatedAt()
        );
    }
}
