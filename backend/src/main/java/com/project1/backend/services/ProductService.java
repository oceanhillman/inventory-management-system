package com.project1.backend.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.project1.backend.dtos.ProductRequest;
import com.project1.backend.dtos.ProductResponse;
import com.project1.backend.mappers.ProductMapper;
import com.project1.backend.models.Category;
import com.project1.backend.models.Product;
import com.project1.backend.repositories.CategoryRepository;
import com.project1.backend.repositories.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(  ProductRepository productRepository,
                            CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        // Get the category by the name supplied. If the category doesn't exist, create it
        Category category = categoryRepository.findByName(request.category())
            .orElseGet(() -> categoryRepository.save(new Category(request.category())));

        Product product = ProductMapper.fromRequest(request, category);
        
        return ProductMapper.toResponse(productRepository.save(product));
    }

    public List<ProductResponse> findAllProducts() {
        return productRepository.findAll().stream()
            .map(ProductMapper::toResponse).toList();
    }

    public ProductResponse findProductById(Integer id) {
        return ProductMapper.toResponse(productRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("No product found with that ID."))
        );
    }

    @Transactional
    public ProductResponse updateProduct(Integer id, ProductRequest request) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("No product found with that ID.")
        );

        // Get the category by the name supplied. If the category doesn't exist, create it
        Category category = categoryRepository.findByName(request.category())
            .orElseGet(() -> categoryRepository.save(new Category(request.category())));

        product.setSku(request.sku());
        product.setName(request.name());
        product.setDescription(request.description());
        product.setCategory(category);
        product.setPrice(request.price());

        return ProductMapper.toResponse(productRepository.save(product));
    }

    @Transactional
    public String deleteProduct(Integer id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("No product found with that ID."));

        productRepository.delete(product);

        return product.getName();
    }
}
