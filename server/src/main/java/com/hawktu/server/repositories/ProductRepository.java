package com.hawktu.server.repositories;

import java.math.BigDecimal;
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

    @Query("SELECT p FROM Product p WHERE p.stock <= :stockThreshold")
    List<Product> findProductsBelowStockThreshold(@Param("stockThreshold") int stockThreshold);

    @Query("SELECT p FROM Product p WHERE "
     + "(:minPrice IS NULL OR p.price >= :minPrice) AND "
     + "(:maxPrice IS NULL OR p.price <= :maxPrice) AND "
     + "(:rating IS NULL OR p.averageRating >= :rating) AND "
     + "(:categoryId IS NULL OR p.categoryId = :categoryId)")
    Page<Product> findByDynamicFilter(@Param("minPrice") BigDecimal minPrice,
                                  @Param("maxPrice") BigDecimal maxPrice,
                                  @Param("rating") Double rating,
                                  @Param("categoryId") Long categoryId,
                                  Pageable pageable);

}
