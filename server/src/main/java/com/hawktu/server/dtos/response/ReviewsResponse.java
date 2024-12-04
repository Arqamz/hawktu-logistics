package com.hawktu.server.dtos.response;

import java.util.List;

public class ReviewsResponse {
    private List<ReviewResponsePayload> reviews;

    public ReviewsResponse(List<ReviewResponsePayload> reviews) {
        this.reviews = reviews;
    }

    public List<ReviewResponsePayload> getReviews() {
        return reviews;
    }

    public void setReviews(List<ReviewResponsePayload> reviews) {
        this.reviews = reviews;
    }
}
