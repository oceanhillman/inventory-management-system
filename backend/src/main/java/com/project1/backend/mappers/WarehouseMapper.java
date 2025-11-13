package com.project1.backend.mappers;

import java.util.List;

import com.project1.backend.dtos.InventoryResponse;
import com.project1.backend.dtos.WarehouseRequest;
import com.project1.backend.dtos.WarehouseResponse;
import com.project1.backend.models.Warehouse;

public class WarehouseMapper {
    public static WarehouseResponse toResponse(Warehouse warehouse) {
        List<InventoryResponse> summarizedInventory = warehouse.getInventory().stream()
            .map(inventory -> new InventoryResponse(
                inventory.getId().getWarehouseId(),
                inventory.getId().getProductId(),
                inventory.getProduct().getName(),
                inventory.getQuantity(),
                inventory.getStorageLocation()
            ))
            .toList();

        return new WarehouseResponse(
            warehouse.getId(),
            warehouse.getName(),
            warehouse.getLocation(),
            warehouse.getCapacity(),
            summarizedInventory
        );
    }

    public static Warehouse fromRequest(WarehouseRequest request) {
        return new Warehouse(
            request.name(),
            request.location(),
            request.capacity()
        );
    }
}
