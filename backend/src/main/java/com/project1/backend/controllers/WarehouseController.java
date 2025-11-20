package com.project1.backend.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project1.backend.dtos.WarehouseRequest;
import com.project1.backend.dtos.WarehouseResponse;
import com.project1.backend.services.WarehouseService;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@CrossOrigin(origins = "${FRONTEND_URL}", exposedHeaders = "error")
@RequestMapping("/warehouses")
public class WarehouseController {

    private final WarehouseService service;
    public WarehouseController(WarehouseService service) {
        this.service = service;
    }
    
    @PostMapping
    public ResponseEntity<WarehouseResponse> createWarehouse(@RequestBody WarehouseRequest request) {
        try {
            WarehouseResponse response = service.createWarehouse(request);

            HttpHeaders headers = new HttpHeaders();
            headers.add("X-Activity-Message", "Created new warehouse: " + request.name());
            return ResponseEntity.status(HttpStatus.CREATED)
                                 .headers(headers)
                                 .body(response);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().header("error", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }
    
    @GetMapping
    public ResponseEntity<List<WarehouseResponse>> findAllWarehouses() {
        try {
            List<WarehouseResponse> response = service.findAllWarehouses();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<WarehouseResponse> findWarehouseById(@PathVariable Integer id) {
        try {
            WarehouseResponse response = service.findWarehouseById(id);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().header("error", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<WarehouseResponse> updateWarehouse(@PathVariable Integer id, @RequestBody WarehouseRequest request) {
        try {
            WarehouseResponse response = service.updateWarehouse(id, request);

            HttpHeaders headers = new HttpHeaders();
            headers.add("X-Activity-Message", "Updated warehouse details: " + request.name());
            return ResponseEntity.status(HttpStatus.OK)
                                 .headers(headers)
                                 .body(response);

        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().header("error", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteWarehouse(@PathVariable Integer id) {
        try {
            String deleted = service.deleteWarehouse(id);

            HttpHeaders headers = new HttpHeaders();
            headers.add("X-Activity-Message", "Deleted warehouse: " + deleted);
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
