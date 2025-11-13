package com.project1.backend.dtos;

public record ProductResponse (
    Integer id,
    String sku,
    String name,
    String description,
    String category,
    Double price
){ }