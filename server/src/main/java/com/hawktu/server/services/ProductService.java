package com.hawktu.server.services;

import com.hawktu.server.models.Product;
import com.hawktu.server.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void updateProductStock(Product product, int quantityToReduce) {
        if (product.getStock() < quantityToReduce) {
            throw new RuntimeException("Insufficient stock for product: " + product.getName());
        }
        product.setStock(product.getStock() - quantityToReduce);
        productRepository.save(product);
    }
}