package com.hawktu.server.builders;

import com.hawktu.server.models.Review;
import java.time.LocalDateTime;

public class ReviewBuilder {
    private Long productId;
    private int rating;
    private String comment;
    private LocalDateTime createdAt;

    public ReviewBuilder() {
        this.createdAt = LocalDateTime.now(); // Default to the current time
    }

    public ReviewBuilder withProductId(Long productId) {
        this.productId = productId;
        return this;
    }

    public ReviewBuilder withRating(int rating) {
        this.rating = rating;
        return this;
    }

    public ReviewBuilder withComment(String comment) {
        this.comment = comment;
        return this;
    }

    public ReviewBuilder withCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public Review build() {
        // Validate required fields
        if (productId == null) {
            throw new IllegalStateException("Product ID is required");
        }
        if (rating < 1 || rating > 5) {
            throw new IllegalStateException("Rating must be between 1 and 5");
        }
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }

        // Create and return the Review object
        return new Review(productId, rating, comment);
    }
}
