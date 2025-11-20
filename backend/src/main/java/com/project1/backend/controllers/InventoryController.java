package com.project1.backend.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project1.backend.dtos.InventoryRequest;
import com.project1.backend.dtos.InventoryResponse;
import com.project1.backend.services.InventoryService;
import com.project1.backend.services.ProductService;
import com.project1.backend.services.WarehouseService;

@RestController
@CrossOrigin(origins = "${FRONTEND_URL}", exposedHeaders = "error")
@RequestMapping("/warehouses/{warehouseId}/inventory")
public class InventoryController {
    
    private final InventoryService service;
    private final WarehouseService warehouseService;
    private final ProductService productService;
    public InventoryController(InventoryService service, WarehouseService warehouseService, ProductService productService) {
        this.service = service;
        this.warehouseService = warehouseService;
        this.productService = productService;
    }

    // POST an entry to a warehouse's inventory
    // if warehouse already contains inventory for a given product, this simply updates the quantity
    @PostMapping
    public ResponseEntity<InventoryResponse> addInventory(@PathVariable Integer warehouseId, @RequestBody InventoryRequest request) {
        try {
            InventoryResponse response = service.addInventory(warehouseId, request);
            
            String warehouse = warehouseService.findWarehouseById(warehouseId).name();

            HttpHeaders headers = new HttpHeaders();
            headers.add("X-Activity-Message", "Added inventory to " + warehouse +  ": " + response.productName() + " (" + response.quantity() + ")");
            return ResponseEntity.status(HttpStatus.CREATED)
                                 .headers(headers)
                                 .body(response);

        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().header("error", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }

    @PostMapping("/transfer/{destinationId}")
    public ResponseEntity<List<InventoryResponse>> transferInventory(@PathVariable Integer warehouseId, @PathVariable Integer destinationId, @RequestBody InventoryRequest request) {
        try {
            List<InventoryResponse> response = service.transferInventory(warehouseId, destinationId, request);
            
            String source = warehouseService.findWarehouseById(warehouseId).name();
            String destination = warehouseService.findWarehouseById(destinationId).name();
            String product = productService.findProductById(request.productId()).name();

            HttpHeaders headers = new HttpHeaders();
            headers.add("X-Activity-Message", "Transferred inventory to " + destination +  " from " + source + ": " + product + " (" + request.quantity() + ")");
            return ResponseEntity.status(HttpStatus.OK)
                                 .headers(headers)
                                 .body(response);
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
            String warehouse = warehouseService.findWarehouseById(warehouseId).name();
            String product = productService.findProductById(request.productId()).name();

            HttpHeaders headers = new HttpHeaders();
            headers.add("X-Activity-Message", "Updated inventory for " + warehouse +  ": " + product + " (" + request.quantity() + ")");
            return ResponseEntity.status(HttpStatus.OK)
                                 .headers(headers)
                                 .body(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().header("error", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }

    // PUT inventory entry
    @PutMapping
    public ResponseEntity<InventoryResponse> updateInventory(@PathVariable Integer warehouseId, @RequestBody InventoryRequest request) {
        try {
            InventoryResponse response = service.updateInventory(warehouseId, request);
            String warehouse = warehouseService.findWarehouseById(warehouseId).name();
            String product = productService.findProductById(request.productId()).name();

            HttpHeaders headers = new HttpHeaders();
            headers.add("X-Activity-Message", "Updated inventory for " + warehouse +  ": " + product + " (" + request.quantity() + ")");
            return ResponseEntity.status(HttpStatus.OK)
                                 .headers(headers)
                                 .body(response);
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
            String warehouse = warehouseService.findWarehouseById(warehouseId).name();
            String product = productService.findProductById(productId).name();

            HttpHeaders headers = new HttpHeaders();
            headers.add("X-Activity-Message", "Deleted inventory entry from " + warehouse + ": " + product);
            return ResponseEntity.status(HttpStatus.OK)
                                 .headers(headers)
                                 .build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().header("error", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }

}