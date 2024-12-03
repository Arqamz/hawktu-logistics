package com.hawktu.server.repositories;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hawktu.server.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Find all products by seller ID
    @Query("SELECT p FROM Product p WHERE p.sellerId = :sellerId")
    List<Product> findAllBySellerId(@Param("sellerId") Long sellerId);

    // Calculate the average rating of all products
    @Query("SELECT AVG(p.averageRating) FROM Product p")
    Double calculateAverageRating();

    // Find all products by category ID
    @Query("SELECT p FROM Product p WHERE p.categoryId = :categoryId")
    List<Product> findAllByCategoryId(@Param("categoryId") Long categoryId);

    // Find all listed products
    @Query("SELECT p FROM Product p WHERE p.unlisted = false")
    List<Product> findListedProducts();

    // Find all unlisted products
    @Query("SELECT p FROM Product p WHERE p.unlisted = true")
    List<Product> findUnlistedProducts();

    // Find all products in stock
    @Query("SELECT p FROM Product p WHERE p.stock > 0")
    List<Product> findProductsInStock();

    // Find products below a given stock threshold
    @Query("SELECT p FROM Product p WHERE p.stock <= :stockThreshold")
    List<Product> findProductsBelowStockThreshold(@Param("stockThreshold") int stockThreshold);

    // Find products based on dynamic filters
    @Query("SELECT p FROM Product p WHERE "
    + "(:minPrice IS NULL OR p.price >= :minPrice) AND "
    + "(:maxPrice IS NULL OR p.price <= :maxPrice) AND "
    + "(:minRating IS NULL OR p.averageRating >= :minRating) AND "
    + "(:maxRating IS NULL OR p.averageRating <= :maxRating) AND "
    + "(:categoryId IS NULL OR p.categoryId = :categoryId) AND p.stock >= 1 and p.unlisted = false")
    Page<Product> findByDynamicFilter(@Param("minPrice") BigDecimal minPrice,
                                 @Param("maxPrice") BigDecimal maxPrice,
                                 @Param("minRating") Double minRating,
                                 @Param("maxRating") Double maxRating,
                                 @Param("categoryId") Long categoryId,
                                 Pageable pageable);

    // Find active products (listed and in-stock) by seller email
    @Query("SELECT COUNT(p) FROM Product p " +
       "JOIN Seller s ON p.sellerId = s.id " +
       "WHERE s.email = :email " +
       "AND p.unlisted = false " +
       "AND p.stock > 0 " +
       "AND (:startDate IS NULL OR p.createdDate >= :startDate) " +
       "AND (:endDate IS NULL OR p.createdDate <= :endDate)")
    Long countActiveProductsBySellerEmailAndDateRange(@Param("email") String email,@Param("startDate") LocalDateTime startDate,@Param("endDate") LocalDateTime endDate);
}
