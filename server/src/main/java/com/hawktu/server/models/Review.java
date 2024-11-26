package com.hawktu.server.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Store only the product ID as a foreign key reference instead of the entire Product
    // We will have to verify that the product ID exists in the database by ourselves
    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(nullable = false)
    private int rating;

    @Column(length = 200)
    private String comment;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public Review() {}

    public Review(Long productId, int rating, String comment) {
        this.productId = productId;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return String.format("Review[id=%s, rating=%s, comment=%s, createdAt=%s]",
                id, rating, comment, createdAt);
    }
}
