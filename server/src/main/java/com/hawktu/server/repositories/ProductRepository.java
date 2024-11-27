package com.hawktu.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hawktu.server.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Fetch all products by a specific seller
    @Query("SELECT p FROM Product p WHERE p.sellerId = :sellerId")
    List<Product> findAllBySellerId(@Param("sellerId") Long sellerId);

    // Calculate the average rating of all products
    @Query("SELECT AVG(p.averageRating) FROM Product p")
    Double calculateAverageRating();

    // Fetch all products by category ID
    @Query("SELECT p FROM Product p WHERE p.categoryId = :categoryId")
    List<Product> findAllByCategoryId(@Param("categoryId") Long categoryId);

    // Fetch only listed products
    @Query("SELECT p FROM Product p WHERE p.unlisted = false")
    List<Product> findListedProducts();

    // Fetch only unlisted products
    @Query("SELECT p FROM Product p WHERE p.unlisted = true")
    List<Product> findUnlistedProducts();

    // Fetch products based on stock availability (e.g., in stock only)
    @Query("SELECT p FROM Product p WHERE p.stock > 0")
    List<Product> findProductsInStock();

    // Fetch products based on stock level threshold
    @Query("SELECT p FROM Product p WHERE p.stock <= :stockThreshold")
    List<Product> findProductsBelowStockThreshold(@Param("stockThreshold") int stockThreshold);
}
