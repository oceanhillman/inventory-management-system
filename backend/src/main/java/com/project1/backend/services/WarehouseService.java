package com.project1.backend.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.project1.backend.models.Warehouse;
import com.project1.backend.repositories.WarehouseRepository;

@Service
public class WarehouseService {
    
    private final WarehouseRepository repository;
    public WarehouseService(WarehouseRepository repository) {
        this.repository = repository;
    }
    
    public Warehouse createWarehouse(Warehouse warehouse) {
        return repository.save(warehouse);
    }

    public List<Warehouse> findAllWarehouses() {
        return repository.findAll();
    }

    public Warehouse findWarehouseById(Integer id) throws NoSuchElementException {
        return repository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("No warehouse found with that ID."));
    }

    public Warehouse updateWarehouse(Integer id, Warehouse updatedWarehouse) throws NoSuchElementException {
        return repository.findById(id)
        .map(outdatedWarehouse -> {
            outdatedWarehouse.setName(updatedWarehouse.getName());
            outdatedWarehouse.setLocation(updatedWarehouse.getLocation());
            outdatedWarehouse.setCapacity(updatedWarehouse.getCapacity());
            return repository.save(outdatedWarehouse);
        }).orElseThrow(() -> new NoSuchElementException("No warehouse found with that ID."));
    }

    public void deleteWarehouse(Integer id) {
        Warehouse warehouse = repository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("No warehouse found with that ID."));

        repository.delete(warehouse);
    }
}
