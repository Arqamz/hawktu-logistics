package com.hawktu.server.models;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

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
    private int stock;
 
    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private Seller seller;

    public Product() {}

    public Product(String name, String description, BigDecimal price, String imageLink, Seller seller) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageLink = imageLink;
        this.seller = seller;
        this.unlisted = false;
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

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public Seller getSeller() {
        return seller;
    }

    public void setSeller(Seller seller) {
        this.seller = seller;
    }

    public void unlist() {
        this.unlisted = true;
    }

    public void list() {
        this.unlisted = false;
    }

    @Override
    public String toString() {
        return String.format("Product[id=%s, name=%s, price=%s, unlisted=%s]", 
                "P" + this.getId(), this.name, this.price, this.unlisted);
    }
}
