package com.project1.backend.dtos;

import java.util.List;

public record WarehouseResponse (
    Integer id,
    String name,
    String location,
    Integer capacity,
    List<InventoryResponse> inventory
) {}
