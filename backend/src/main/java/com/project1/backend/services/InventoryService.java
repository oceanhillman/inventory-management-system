package com.project1.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.project1.backend.dtos.InventoryRequest;
import com.project1.backend.dtos.InventoryResponse;
import com.project1.backend.mappers.InventoryMapper;
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
    public InventoryResponse addInventory(Integer warehouseId, InventoryRequest request) {
        Warehouse warehouse = warehouseRepository.findById(warehouseId)
            .orElseThrow(() -> new NoSuchElementException("Warehouse not found."));
        Product product = productRepository.findById(request.productId())
            .orElseThrow(() -> new NoSuchElementException("Product not found."));

        final int usedCapacity = inventoryRepository.getUsedCapacity(warehouseId);
        final int remainingCapacity = warehouse.getCapacity() - usedCapacity;

        // check capacity
        if (remainingCapacity < request.quantity()) {
            throw new IllegalArgumentException("Warehouse capacity exceeded.");
        }

        InventoryId id = new InventoryId(warehouseId, request.productId());
        Inventory inventory = inventoryRepository.findById(id)
            .orElse(new Inventory(warehouse, product, 0, request.storageLocation()));

        // id needs to be created manually or we get an error
        if (inventory.getId() == null) {
            inventory.setId(id);
        }

        inventory.setQuantity(inventory.getQuantity() + request.quantity());
        
        return InventoryMapper.toResponse(inventoryRepository.save(inventory));
    }

    public List<InventoryResponse> findInventoryByWarehouseId(Integer warehouseId) {
        warehouseRepository.findById(warehouseId)
            .orElseThrow(() -> new NoSuchElementException("Warehouse not found."));

        List<InventoryResponse> response = 
            inventoryRepository.findByWarehouseId(warehouseId).stream()
                .map(InventoryMapper::toResponse)
                .toList();
        return response;
    }

    @Transactional
    public List<InventoryResponse> transferInventory(Integer warehouseId, Integer destinationId, InventoryRequest request) {
        if (request.quantity() <= 0) {
            throw new IllegalArgumentException("Transferred quantity must be greater than zero.");
        }
        warehouseRepository.findById(warehouseId)
            .orElseThrow(() -> new NoSuchElementException("Source warehouse not found."));
        Warehouse destination = warehouseRepository.findById(destinationId)
            .orElseThrow(() -> new NoSuchElementException("Destination warehouse not found."));
        Product product = productRepository.findById(request.productId())
            .orElseThrow(() -> new NoSuchElementException("Product not found."));

        InventoryId sourceInvId = new InventoryId(warehouseId, product.getId());
        Inventory sourceInv = inventoryRepository.findById(sourceInvId)
            .orElseThrow(() -> new NoSuchElementException("Inventory entry not found."));

        // check supply of source warehouse
        if (sourceInv.getQuantity() < request.quantity()) {
            throw new IllegalArgumentException("Source warehouse has inadequate supply");
        }

        // check capacity of destination warehouse
        final int destUsedCapacity = inventoryRepository.getUsedCapacity(destinationId);
        final int destRemainingCapacity = destination.getCapacity() - destUsedCapacity;
        if (destRemainingCapacity < request.quantity()) {
            throw new IllegalArgumentException("Destination warehouse capacity exceeded.");
        }

        InventoryId destInvId = new InventoryId(destinationId, product.getId());
        Inventory destInv = inventoryRepository.findById(destInvId)
            .orElse(new Inventory(destination, product, 0, request.storageLocation()));

        // id needs to be created manually or we get an error
        if (destInv.getId() == null) {
            destInv.setId(destInvId);
        }

        sourceInv.setQuantity(sourceInv.getQuantity() - request.quantity());
        destInv.setQuantity(destInv.getQuantity() + request.quantity());

        List<InventoryResponse> response = new ArrayList<InventoryResponse>();

        response.add(InventoryMapper.toResponse(inventoryRepository.save(sourceInv)));
        response.add(InventoryMapper.toResponse(inventoryRepository.save(destInv)));

        return response;
    }

    @Transactional
    public InventoryResponse updateQuantity(Integer warehouseId, InventoryRequest request) {
        InventoryId id = new InventoryId(warehouseId, request.productId());

        Warehouse warehouse = warehouseRepository.findById(warehouseId)
            .orElseThrow(() -> new NoSuchElementException("Warehouse not found."));
        Inventory inventory = inventoryRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Inventory entry not found."));

        // subtract the existing quantity value so we don't double-count
        final int usedCapacity = inventoryRepository.getUsedCapacity(warehouseId) - inventory.getQuantity();
        final int remainingCapacity = warehouse.getCapacity() - usedCapacity;

        // check capacity
        if (remainingCapacity < request.quantity()) {
            throw new IllegalArgumentException("Warehouse capacity exceeded.");
        }

        inventory.setQuantity(request.quantity());
        return InventoryMapper.toResponse(inventoryRepository.save(inventory));
    }

    @Transactional
    public InventoryResponse updateInventory(Integer warehouseId, InventoryRequest request) {
        InventoryId id = new InventoryId(warehouseId, request.productId());

        Warehouse warehouse = warehouseRepository.findById(warehouseId)
            .orElseThrow(() -> new NoSuchElementException("Warehouse not found."));
        Inventory inventory = inventoryRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Inventory entry not found."));

        // subtract the existing quantity value so we don't double-count
        final int usedCapacity = inventoryRepository.getUsedCapacity(warehouseId) - inventory.getQuantity();
        final int remainingCapacity = warehouse.getCapacity() - usedCapacity;

        // check capacity
        if (remainingCapacity < request.quantity()) {
            throw new IllegalArgumentException("Warehouse capacity exceeded.");
        }

        inventory.setQuantity(request.quantity());
        inventory.setStorageLocation(request.storageLocation());
        return InventoryMapper.toResponse(inventoryRepository.save(inventory));
    }

    @Transactional
    public void deleteInventory(Integer warehouseId, Integer productId) {
        InventoryId id = new InventoryId(warehouseId, productId);

        Inventory inventory = inventoryRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Inventory entry not found."));

        inventoryRepository.delete(inventory);
    }
}
