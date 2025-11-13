package com.project1.backend.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.project1.backend.dtos.WarehouseRequest;
import com.project1.backend.dtos.WarehouseResponse;
import com.project1.backend.mappers.WarehouseMapper;
import com.project1.backend.models.Warehouse;
import com.project1.backend.repositories.WarehouseRepository;

import jakarta.transaction.Transactional;

@Service
public class WarehouseService {
    
    private final WarehouseRepository warehouseRepository;
    public WarehouseService(WarehouseRepository warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }
    
    @Transactional
    public WarehouseResponse createWarehouse(WarehouseRequest request) {
        return WarehouseMapper.toResponse(
            warehouseRepository.save(WarehouseMapper.fromRequest(request))
        );
    }

    public List<WarehouseResponse> findAllWarehouses() {
        List<WarehouseResponse> response = 
            warehouseRepository.findAll().stream()
                .map(WarehouseMapper::toResponse)
                .toList();
        return response;
    }

    public WarehouseResponse findWarehouseById(Integer id) {
        return WarehouseMapper.toResponse(
            warehouseRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No warehouse found with that ID.")
            )
        );
    }

    @Transactional
    public WarehouseResponse updateWarehouse(Integer id, WarehouseRequest request) {

        Warehouse warehouse = warehouseRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("No warehouse found with that ID."));

        warehouse.setName(request.name());
        warehouse.setLocation(request.location());
        warehouse.setCapacity(request.capacity());

        return WarehouseMapper.toResponse(warehouseRepository.save(warehouse));
    }

    @Transactional
    public void deleteWarehouse(Integer id) {
        Warehouse warehouse = warehouseRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("No warehouse found with that ID."));

        warehouseRepository.delete(warehouse);
    }
}
