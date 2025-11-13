package com.project1.backend.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.project1.backend.models.Category;
import com.project1.backend.repositories.CategoryRepository;

@Service
public class CategoryService {
    
    private final CategoryRepository categoryRepository;
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category createCategory(String request) {
        if (request == null || request.isBlank()) {
            throw new IllegalArgumentException("Category name cannot be empty.");
        }

        return categoryRepository.save(new Category(request));
    }

    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    public Category findCategoryById(Integer id) {
        return categoryRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("No category found with that ID."));
    }

    public Category updateCategory(Integer id, String name) {
        return categoryRepository.findById(id)
        .map(category -> {
            category.setName(name);
            return categoryRepository.save(category);
        })
        .orElseThrow(() -> new NoSuchElementException("No category found with that ID."));
    }

    public void deleteCategory(Integer id) {
        Category category = categoryRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("No category found with that ID."));

        categoryRepository.delete(category);
    }
}
