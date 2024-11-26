package com.hawktu.server.models;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private String imageLink;

    @Column(nullable = false)
    private boolean unlisted;

    @Column(nullable = false)
    private Double averageRating;

    @Column(nullable = false)
    private Long categoryId;
    
    @Column(nullable = false)
    private int stock;

    @Column(nullable = false)
    private Long sellerId;

    public Product() {}

    public Product(String name, String description, BigDecimal price, String imageLink, boolean unlisted, Double averageRating, Long categoryId, int stock, Long sellerId) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageLink = imageLink;
        this.unlisted = unlisted;
        this.averageRating = averageRating;
        this.categoryId = categoryId;
        this.stock = stock;
        this.sellerId = sellerId;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }

    public boolean isUnlisted() {
        return unlisted;
    }

    public void setUnlisted(boolean unlisted) {
        this.unlisted = unlisted;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    public void unlist() {
        this.unlisted = true;
    }

    public void list() {
        this.unlisted = false;
    }

    @Override
    public String toString() {
        return String.format("Product[id=%s, name=%s, price=%s, category=%s, unlisted=%s]", 
                "P" + this.getId(), this.name, this.price, this.categoryId, this.unlisted);
    }
}
