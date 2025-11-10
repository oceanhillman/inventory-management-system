package com.project1.backend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project1.backend.models.Warehouse;

@Service
public class WarehouseService {
    private final List<Warehouse> warehouses = new ArrayList<>();
    private int nextId = 1;
    
    public Warehouse addWarehouse(Warehouse warehouse) {
        warehouse.setId(nextId++);
        warehouses.add(warehouse);
        return warehouse;
    }
}
