package com.project1.backend.dtos;

public record WarehouseRequest (
    String name,
    String location,
    Integer capacity
) {}
