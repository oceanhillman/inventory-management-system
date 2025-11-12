package com.project1.backend.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.project1.backend.models.Product;
import com.project1.backend.repositories.ProductRepository;

@Service
public class ProductService {
    private final ProductRepository repository;
    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }
    
    public Product createProduct(Product product) {
        return repository.save(product);
    }

    public List<Product> findAllProducts() {
        return repository.findAll();
    }

    public Product findProductById(Integer id) {
        return repository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("No product found with that ID."));
    }

    public Product updateProduct(Integer id, Product updatedProduct) {
        return repository.findById(id)
        .map(outdatedProduct -> {
            outdatedProduct.setName(updatedProduct.getName());
            outdatedProduct.setDescription(updatedProduct.getDescription());
            outdatedProduct.setPrice(updatedProduct.getPrice());
            outdatedProduct.setCategory(updatedProduct.getCategory());
            return repository.save(outdatedProduct);
        }).orElseThrow(() -> new NoSuchElementException("No product found with that ID."));
    }

    public void deleteProduct(Integer id) {
        Product product = repository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("No product found with that ID."));

        repository.delete(product);
    }
}
