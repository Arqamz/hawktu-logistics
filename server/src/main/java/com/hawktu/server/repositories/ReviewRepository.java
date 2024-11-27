package com.hawktu.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hawktu.server.models.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Fetch all reviews sorted by the most recent createdAt
    @Query("SELECT r FROM Review r ORDER BY r.createdAt DESC")
    List<Review> findAllSortedByCreatedAt();

    // Fetch all reviews for a specific rating
    @Query("SELECT r FROM Review r WHERE r.rating = :rating")
    List<Review> findAllByRating(@Param("rating") int rating);

    // Fetch all reviews with a rating greater than the specified value
    @Query("SELECT r FROM Review r WHERE r.rating > :rating")
    List<Review> findAllWithRatingGreaterThan(@Param("rating") int rating);

    // Fetch all reviews with a rating less than the specified value
    @Query("SELECT r FROM Review r WHERE r.rating < :rating")
    List<Review> findAllWithRatingLessThan(@Param("rating") int rating);

    // Fetch all reviews for a specific product
    @Query("SELECT r FROM Review r WHERE r.productId = :productId ORDER BY r.createdAt DESC")
    List<Review> findAllByProductId(@Param("productId") Long productId);
}
