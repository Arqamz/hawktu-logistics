package com.hawktu.server.factories;

import org.springframework.stereotype.Component;

import com.hawktu.server.builders.ReviewBuilder;
import com.hawktu.server.models.Review;
import com.hawktu.server.repositories.ReviewRepository;

@Component
public class ReviewFactory {
    
    private ReviewRepository reviewRepository;
    
    public Review createReview(Long customerId,Long productId, int rating, String comment) {
        Review review =  new ReviewBuilder()
            .withCustomerId(customerId)
            .withProductId(productId)
            .withRating(rating)
            .withComment(comment)
            .build();
        
        reviewRepository.save(review);
        return review;
    }
}
