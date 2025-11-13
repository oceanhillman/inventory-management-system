package com.project1.backend.dtos;

public record ProductRequest (
    String sku,
    String name,
    String description,
    String category,
    Double price
){ }
