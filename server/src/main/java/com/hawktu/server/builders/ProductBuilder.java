package com.hawktu.server.builders;

import com.hawktu.server.models.Product;


import java.math.BigDecimal;

public class ProductBuilder {
    private String name;
    private String description;
    private BigDecimal price;
    private String imageLink;
    private boolean unlisted = false;
    private Double averageRating = 0.0;
    private Long categoryId;
    private int stock = 0;
    private Long sellerId;

    public ProductBuilder name(String name) {
        this.name = name;
        return this;
    }

    public ProductBuilder description(String description) {
        this.description = description;
        return this;
    }

    public ProductBuilder price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public ProductBuilder imageLink(String imageLink) {
        this.imageLink = imageLink;
        return this;
    }

    public ProductBuilder unlisted(boolean unlisted) {
        this.unlisted = unlisted;
        return this;
    }

    public ProductBuilder averageRating(Double averageRating) {
        this.averageRating = averageRating;
        return this;
    }

    public ProductBuilder categoryId(Long categoryId) {
        this.categoryId = categoryId;
        return this;
    }

    public ProductBuilder stock(int stock) {
        this.stock = stock;
        return this;
    }

    public ProductBuilder sellerId(Long sellerId) {
        this.sellerId = sellerId;
        return this;
    }

    public Product build() {
        // Validate required fields
        validateProduct();
        
        return new Product(
            name, 
            description, 
            price, 
            imageLink, 
            unlisted, 
            averageRating, 
            categoryId, 
            stock, 
            sellerId
        );
    }

    private void validateProduct() {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Product name cannot be empty");
        }
        
        if (description == null || description.trim().isEmpty()) {
            throw new IllegalArgumentException("Product description cannot be empty");
        }
        
        if (price == null || price.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Product price must be greater than zero");
        }
        
        if (imageLink == null || imageLink.trim().isEmpty()) {
            throw new IllegalArgumentException("Product image link cannot be empty");
        }
        
        if (categoryId == null) {
            throw new IllegalArgumentException("Category ID is required");
        }
        
        if (sellerId == null) {
            throw new IllegalArgumentException("Seller ID is required");
        }
        
        if (stock < 0) {
            throw new IllegalArgumentException("Stock cannot be negative");
        }
    }
}