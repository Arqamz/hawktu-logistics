package com.hawktu.server.factories;

import com.hawktu.server.builders.ReviewBuilder;
import com.hawktu.server.models.Review;
import com.hawktu.server.repositories.ReviewRepository;

public class ReviewFactory {
    
    private ReviewRepository reviewRepository;
    
    public Review createReview(Long productId, int rating, String comment) {
        Review review =  new ReviewBuilder()
            .withProductId(productId)
            .withRating(rating)
            .withComment(comment)
            .build();
        
        reviewRepository.save(review);
        return review;
    }
}
