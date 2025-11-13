package com.project1.backend.mappers;

import com.project1.backend.dtos.InventoryResponse;
import com.project1.backend.models.Inventory;

public class InventoryMapper {
    public static InventoryResponse toResponse(Inventory inventory) {
        return new InventoryResponse(
            inventory.getWarehouse().getId(),
            inventory.getProduct().getId(),
            inventory.getProduct().getName(),
            inventory.getQuantity(),
            inventory.getStorageLocation()
        );
    }
}
