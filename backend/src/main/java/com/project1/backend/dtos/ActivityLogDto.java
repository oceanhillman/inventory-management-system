package com.project1.backend.dtos;

import java.time.LocalDateTime;

public record ActivityLogDto(
    String action,
    String details,
    LocalDateTime createdAt
) { }
