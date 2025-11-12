package com.project1.backend.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.project1.backend.models.Category;
import com.project1.backend.repositories.CategoryRepository;

@Service
public class CategoryService {
    
    private final CategoryRepository repository;
    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    public Category createCategory(Category category) {
        if (category.getName() == null || category.getName().isBlank()) {
            throw new IllegalArgumentException("Category name cannot be empty.");
        }
        return repository.save(category);
    }

    public List<Category> findAllCategories() {
        return repository.findAll();
    }

    public Category findCategoryById(Integer id) {
        return repository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("No category found with that ID."));
    }

    public Category updateCategory(Integer id, Category updatedCategory) {
        return repository.findById(id)
        .map(outdatedCategory -> {
            outdatedCategory.setName(updatedCategory.getName());
            return repository.save(outdatedCategory);
        })
        .orElseThrow(() -> new NoSuchElementException("No category found with that ID."));
    }

    public void deleteCategory(Integer id) {
        Category category = repository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("No category found with that ID."));

        repository.delete(category);
    }
}
