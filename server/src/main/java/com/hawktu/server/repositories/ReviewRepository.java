package com.hawktu.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hawktu.server.models.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r ORDER BY r.createdAt DESC")
    List<Review> findAllSortedByCreatedAt();

    @Query("SELECT r FROM Review r WHERE r.rating = :rating")
    List<Review> findAllByRating(@Param("rating") int rating);

    @Query("SELECT r FROM Review r WHERE r.rating > :rating")
    List<Review> findAllWithRatingGreaterThan(@Param("rating") int rating);

    @Query("SELECT r FROM Review r WHERE r.rating < :rating")
    List<Review> findAllWithRatingLessThan(@Param("rating") int rating);

    @Query("SELECT r FROM Review r WHERE r.productId = :productId ORDER BY r.createdAt DESC")
    List<Review> findAllByProductId(@Param("productId") Long productId);
}
