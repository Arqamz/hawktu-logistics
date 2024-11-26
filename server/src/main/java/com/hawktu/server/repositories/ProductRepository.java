// SHOULD BE IMPLEMENTED AS JPA REPOSITORY

package com.hawktu.server.repositories;


import com.hawktu.server.models.Product;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Find products by name (partial match)
    List<Product> findByNameContainingIgnoreCase(String name);

    // Find products by seller ID
    List<Product> findBySellerId(Long sellerId);

    // Find products by category ID
    List<Product> findByCategoryId(Long categoryId);

    // Find listed products
    List<Product> findByUnlistedFalse();

    // Find unlisted products
    List<Product> findByUnlistedTrue();

    // Find products within a price range
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    // Find products with stock above a certain threshold
    List<Product> findByStockGreaterThan(int minStock);

    // Find products by seller ID and category ID
    List<Product> findBySellerIdAndCategoryId(Long sellerId, Long categoryId);

    // Custom query to find products with average rating above a certain value
    @Query("SELECT p FROM Product p WHERE p.averageRating > :minRating AND p.unlisted = false")
    List<Product> findHighlyRatedProducts(@Param("minRating") Double minRating);

    // Check if a product exists by name
    boolean existsByName(String name);

    // Find products sorted by price (low to high)
    List<Product> findByOrderByPriceAsc();

    // Find products sorted by average rating (high to low)
    List<Product> findByOrderByAverageRatingDesc();
}