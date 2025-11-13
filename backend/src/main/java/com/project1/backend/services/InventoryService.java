package com.project1.backend.services;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.project1.backend.dtos.InventoryRequest;
import com.project1.backend.models.Inventory;
import com.project1.backend.models.InventoryId;
import com.project1.backend.models.Product;
import com.project1.backend.models.Warehouse;
import com.project1.backend.repositories.InventoryRepository;
import com.project1.backend.repositories.ProductRepository;
import com.project1.backend.repositories.WarehouseRepository;

import jakarta.transaction.Transactional;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final WarehouseRepository warehouseRepository;
    private final ProductRepository productRepository;

    public InventoryService(InventoryRepository repository,
                            WarehouseRepository warehouseRepository,
                            ProductRepository productRepository) {
        this.inventoryRepository = repository;
        this.warehouseRepository = warehouseRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public Inventory addInventory(Integer warehouseId, InventoryRequest request) {
        Warehouse warehouse = warehouseRepository.findById(warehouseId)
            .orElseThrow(() -> new NoSuchElementException("Warehouse not found."));
        Product product = productRepository.findById(request.productId())
            .orElseThrow(() -> new NoSuchElementException("Product not found."));

        InventoryId id = new InventoryId(warehouseId, request.productId());
        Inventory inventory = inventoryRepository.findById(id)
            .orElse(new Inventory(warehouse, product, 0, request.storageLocation()));

        // id needs to be created manually or we get an error
        if (inventory.getId() == null) {
            inventory.setId(id);
        }

        inventory.setQuantity(inventory.getQuantity() + request.quantity());
        return inventoryRepository.save(inventory);
    }

    @Transactional
    public Inventory updateQuantity(Integer warehouseId, InventoryRequest request) {
        InventoryId id = new InventoryId(warehouseId, request.productId());

        Inventory inventory = inventoryRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Inventory entry not found."));

        inventory.setQuantity(request.quantity());
        return inventoryRepository.save(inventory);
    }   
}
