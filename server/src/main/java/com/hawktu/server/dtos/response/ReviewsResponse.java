package com.hawktu.server.dtos.response;

import java.util.List;

import com.hawktu.server.models.Review;

public class ReviewsResponse {
    private List<Review> reviews;

    public ReviewsResponse(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
}
