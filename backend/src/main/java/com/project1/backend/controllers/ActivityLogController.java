package com.project1.backend.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project1.backend.dtos.ActivityLogDto;
import com.project1.backend.services.ActivityLogService;

@RestController
@CrossOrigin(origins = "${FRONTEND_URL}")
@RequestMapping("/activity")
public class ActivityLogController {

    private final ActivityLogService service;
    public ActivityLogController(ActivityLogService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ActivityLogDto>> getRecentActivity() {
        try {
            List<ActivityLogDto> logs = service.getRecentActivity();
            return ResponseEntity.ok(logs);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }

    @PostMapping
    public ResponseEntity<String> logActivity(String action, String details) {
        try {
            service.log(action, details);
            return ResponseEntity.ok("Activity logged successfully.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }
}
