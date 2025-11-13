package com.project1.backend.dtos;

public record InventoryRequest(
    Integer productId,
    Integer quantity,
    String storageLocation
) {}
