package com.project1.backend.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.project1.backend.dtos.WarehouseRequest;
import com.project1.backend.dtos.WarehouseResponse;
import com.project1.backend.mappers.WarehouseMapper;
import com.project1.backend.models.Warehouse;
import com.project1.backend.repositories.InventoryRepository;
import com.project1.backend.repositories.WarehouseRepository;

import jakarta.transaction.Transactional;

@Service
public class WarehouseService {
    
    private final WarehouseRepository warehouseRepository;
    private final InventoryRepository inventoryRepository;

    public WarehouseService(WarehouseRepository warehouseRepository,
                            InventoryRepository inventoryRepository) {
        this.warehouseRepository = warehouseRepository;
        this.inventoryRepository = inventoryRepository;
    }
    
    @Transactional
    public WarehouseResponse createWarehouse(WarehouseRequest request) {
        Warehouse warehouse = warehouseRepository.save(WarehouseMapper.fromRequest(request));
        // new warehouse has 0 usedCapacity 
        return WarehouseMapper.toResponse(warehouse, 0);
    }

    public List<WarehouseResponse> findAllWarehouses() {
        return warehouseRepository.findAll().stream()
            .map(warehouse -> {
                // we need to query each warehouse for its used capacity
                return WarehouseMapper.toResponse(warehouse, inventoryRepository.getUsedCapacity(warehouse.getId()));
            })
            .toList();
    }

    public WarehouseResponse findWarehouseById(Integer id) {
        Warehouse warehouse = warehouseRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("No warehouse found with that ID."));
        
        return WarehouseMapper.toResponse(warehouse, inventoryRepository.getUsedCapacity(id));
    }

    @Transactional
    public WarehouseResponse updateWarehouse(Integer id, WarehouseRequest request) {

        Warehouse warehouse = warehouseRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("No warehouse found with that ID."));

        final int usedCapacity = inventoryRepository.getUsedCapacity(id);

        if (request.capacity() < usedCapacity) {
            throw new IllegalArgumentException("Inventory exceeds the given capacity.");
        }

        warehouse.setName(request.name());
        warehouse.setLocation(request.location());
        warehouse.setCapacity(request.capacity());

        return WarehouseMapper.toResponse(warehouseRepository.save(warehouse), usedCapacity);
    }

    @Transactional
    public void deleteWarehouse(Integer id) {
        Warehouse warehouse = warehouseRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("No warehouse found with that ID."));

        warehouseRepository.delete(warehouse);
    }
}
