package com.hawktu.server.builders;

import com.hawktu.server.models.Review;

public class ReviewBuilder {
    private Long productId;
    private int rating;
    private String comment;

    public ReviewBuilder() {}

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

    public Review build() {
        
        validateReview();

        Review review = new Review();
        review.setProductId(productId);
        review.setRating(rating);
        review.setComment(comment);
        return review;
    }

    private void validateReview() {
        if (productId == null) {
            throw new IllegalStateException("Product ID is required");
        }

        if (rating < 1 || rating > 5) {
            throw new IllegalStateException("Rating must be between 1 and 5");
        }
    }
}
