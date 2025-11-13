package com.project1.backend.dtos;

public record InventoryResponse (
    Integer warehouseId,
    Integer productId,
    String productName,
    Integer quantity,
    String storageLocation
) {}