package com.project1.backend.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project1.backend.models.Category;
import com.project1.backend.services.CategoryService;

@RestController
@CrossOrigin(origins = "${FRONTEND_URL}")
@RequestMapping("/categories")
public class CategoryController {
    
    private final CategoryService service;
    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody String request) {
        try {
            Category saved = service.createCategory(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().header("error", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Category>> findAllCategories() {
        try {
            List<Category> categories = service.findAllCategories();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> findCategoryById(@PathVariable Integer id) {
        try {
            Category category = service.findCategoryById(id);
            return ResponseEntity.ok(category);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().header("error", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Integer id, @RequestBody String request) {
        try {
            Category saved = service.updateCategory(id, request);
            return ResponseEntity.ok(saved);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().header("error", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Integer id) {
        try {
            service.deleteCategory(id);
            return ResponseEntity.ok("Category deleted successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().header("error", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("error", e.getMessage()).build();
        }
    }
}
