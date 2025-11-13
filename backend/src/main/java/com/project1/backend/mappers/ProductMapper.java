package com.project1.backend.mappers;

import com.project1.backend.dtos.ProductRequest;
import com.project1.backend.dtos.ProductResponse;
import com.project1.backend.models.Category;
import com.project1.backend.models.Product;

public class ProductMapper {
    public static Product fromRequest(ProductRequest request, Category category) {
        return new Product(
            request.sku(),
            request.name(),
            request.description(),
            category,
            request.price()
        );
    }

    public static ProductResponse toResponse(Product product) {
        return new ProductResponse(
            product.getId(),
            product.getSku(),
            product.getName(),
            product.getDescription(),
            product.getCategory().getName(),
            product.getPrice()
        );
    }
}
