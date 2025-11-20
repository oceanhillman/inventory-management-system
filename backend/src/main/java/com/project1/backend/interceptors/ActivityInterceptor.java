package com.project1.backend.interceptors;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.project1.backend.services.ActivityLogService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class ActivityInterceptor implements HandlerInterceptor {

    private final ActivityLogService service;
    public ActivityInterceptor(ActivityLogService service) {
        this.service = service;
    }

    @Override
    public void afterCompletion(
        HttpServletRequest request,
        HttpServletResponse response,
        Object handler,
        Exception ex

    ) throws Exception {

        String method = request.getMethod();
        String path = request.getRequestURI();
        int status = response.getStatus();

        String message = response.getHeader("X-Activity-Message");

        String action = method;
        String details = (message != null) ? message : "Status: " + status;

        if (!path.startsWith("/actuator") && !method.equals("GET") && !method.equals("OPTIONS")) {
            service.log(action, details);
        }
    }
}
