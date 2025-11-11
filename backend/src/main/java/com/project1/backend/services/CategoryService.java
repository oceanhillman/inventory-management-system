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

    public Category createCategory(String name) {
        Category category = new Category(name);
        return repository.save(category);
    }

    public List<Category> findAllCategories() {
        return repository.findAll();
    }

    public Category findCategoryById(Integer id) throws NoSuchElementException {
        return repository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("No category found with that ID."));
    }

    public Category updateCategory(Integer id, String name) throws NoSuchElementException {
        Category outdatedCategory = repository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("No category found with that ID."));

        outdatedCategory.setName(name);
        return repository.save(outdatedCategory);
    }

    public void deleteCategory(Integer id) {
        Category category = repository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("No category found with that ID."));

        repository.delete(category);
    }
}
