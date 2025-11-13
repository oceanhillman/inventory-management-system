package com.project1.backend.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project1.backend.dtos.InventoryRequest;
import com.project1.backend.dtos.InventoryResponse;
import com.project1.backend.services.InventoryService;

@RestController
@RequestMapping("/warehouses/{warehouseId}/inventory")
public class InventoryController {
    
    private final InventoryService service;
    public InventoryController(InventoryService service) {
        this.service = service;
    }

    // POST an entry to a warehouse's inventory
    // if warehouse already contains inventory for a given product, this simply updates the quantity
    @PostMapping
    public ResponseEntity<InventoryResponse> addInventory(@PathVariable Integer warehouseId, @RequestBody InventoryRequest request) {
        try {
            InventoryResponse response = service.addInventory(warehouseId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().header("error", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }

    // GET all inventory for a warehouse
    @GetMapping
    public ResponseEntity<List<InventoryResponse>> getInventory(@PathVariable Integer warehouseId) {
        try {
            List<InventoryResponse> inventory = service.findInventoryByWarehouseId(warehouseId);
            return ResponseEntity.ok(inventory);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }

    // PATCH quantity of product at warehouse
    @PatchMapping
    public ResponseEntity<InventoryResponse> updateQuantity(@PathVariable Integer warehouseId, @RequestBody InventoryRequest request) {
        try {
            InventoryResponse response = service.updateQuantity(warehouseId, request);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().header("error", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }

    @DeleteMapping
    public ResponseEntity<String> deleteInventory(@PathVariable Integer warehouseId, @RequestBody Integer productId) {
        try {
            service.deleteInventory(warehouseId, productId);
            return ResponseEntity.ok("Inventory deleted successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().header("error", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }

}











    // // GET all inventory for a warehouse
    // @GetMapping
    // public ResponseEntity<List<Inventory>> getInventory(@PathVariable Integer warehouseId) {
    //     try {
    //         List<Inventory> inventory = service.findInventoryByWarehouseId(warehouseId);
    //         return ResponseEntity.ok(inventory);
    //     } catch (Exception e) {
    //         return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
    //     }
    // }

    // @GetMapping
    // public ResponseEntity<List<Inventory>> findInventoryByWarehouseId(Integer warehouseId) {
    //     try {
    //         List<Inventory> inventory = service.findInventoryByWarehouseId(warehouseId);
    //         return ResponseEntity.ok(inventory);
    //     } catch (Exception e) {
    //         return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
    //     }
    // }

    // @GetMapping
    // public ResponseEntity<List<Inventory>> findInventoryByProductId(Integer productId) {
    //     try {
    //         List<Inventory> inventory = service.findInventoryByWarehouseId(productId);
    //         return ResponseEntity.ok(inventory);
    //     } catch (Exception e) {
    //         return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
    //     }
    // }
    

