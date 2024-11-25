// SHOULD BE IMPLEMENTED AS JPA REPOSITORY

package com.hawktu.server.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.hawktu.server.models.Product;

public class ProductRepository {
    private final List<Product> products;

    public ProductRepository() {
        this.products = new ArrayList<>();
    }

    public void addProduct(Product product) {
        if (findProductById(product.getId()).isPresent()) {
            throw new IllegalArgumentException("Product with ID " + product.getId() + " already exists.");
        }
        this.products.add(product);
    }

    public boolean deleteProduct(long productId) {
        return products.removeIf(product -> product.getId().equals(productId));
    }

    public void updateProduct(Product updatedProduct) {
        findProductById(updatedProduct.getId())
            .ifPresentOrElse(product -> {
                product.setName(updatedProduct.getName());
                product.setDescription(updatedProduct.getDescription());
                product.setPrice(updatedProduct.getPrice());
                product.setImageLink(updatedProduct.getImageLink());
                product.setUnlisted(updatedProduct.isUnlisted());
            }, () -> {
                throw new IllegalArgumentException("Product with ID P" + updatedProduct.getId() + " not found.");
            });
    }

    public void markAsUnlisted(long productId) {
        findProductById(productId).ifPresentOrElse(
            Product::unlist,
            () -> {
                throw new IllegalArgumentException("Product with ID " + productId + " not found.");
            }
        );
    }

    public List<Product> searchByName(String name) {
        return products.stream()
                .filter(product -> product.getName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }
    
    public Optional<Product> findProductById(long productId) {
        return products.stream().filter(product -> product.getId().equals(productId)).findFirst();
    }

    public List<Product> getAllListedProducts() {
        return products.stream()
                .filter(product -> !product.isUnlisted())
                .collect(Collectors.toList());
    }

    public List<Product> getAllUnlistedProducts() {
        return products.stream()
                .filter(Product::isUnlisted)
                .collect(Collectors.toList());
    }
}
