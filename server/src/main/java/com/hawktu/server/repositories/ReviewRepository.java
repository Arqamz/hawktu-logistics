package com.hawktu.server.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hawktu.server.models.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Find all reviews sorted by creation date in descending order
    @Query("SELECT r FROM Review r ORDER BY r.createdAt DESC")
    List<Review> findAllSortedByCreatedAt();

    // Find all reviews with a specific rating
    @Query("SELECT r FROM Review r WHERE r.rating = :rating")
    List<Review> findAllByRating(@Param("rating") int rating);

    // Find all reviews with a rating greater than a given value
    @Query("SELECT r FROM Review r WHERE r.rating > :rating")
    List<Review> findAllWithRatingGreaterThan(@Param("rating") int rating);

    // Find all reviews with a rating less than a given value
    @Query("SELECT r FROM Review r WHERE r.rating < :rating")
    List<Review> findAllWithRatingLessThan(@Param("rating") int rating);

    // Find all reviews for a specific product, sorted by creation date in descending order
    @Query("SELECT r FROM Review r WHERE r.productId = :productId ORDER BY r.createdAt DESC")
    List<Review> findAllByProductId(@Param("productId") Long productId);

    // Find all reviews for products sold by a specific seller, sorted by creation date in descending order
    @Query("SELECT r FROM Review r JOIN Product p ON r.productId = p.id JOIN Seller s ON p.sellerId = s.id WHERE s.email = :sellerEmail ORDER BY r.createdAt DESC")
    List<Review> findReviewsForSellerProducts(@Param("sellerEmail") String sellerEmail);

    // Find all reviews for products sold by a specific seller within a given date range, sorted by creation date in descending order
    @Query("SELECT r FROM Review r " +
    "JOIN Product p ON r.productId = p.id " +
    "JOIN Seller s ON p.sellerId = s.id " +
    "WHERE s.email = :sellerEmail " +
    "AND (:startDate IS NULL OR r.createdAt >= :startDate) " +
    "AND (:endDate IS NULL OR r.createdAt <= :endDate) " +
    "ORDER BY r.createdAt DESC")
    List<Review> findReviewsForSellerProducts(@Param("sellerEmail") String sellerEmail,@Param("startDate") LocalDateTime startDate,@Param("endDate") LocalDateTime endDate);
}
