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

    @Query("SELECT p FROM Product p WHERE p.sellerId = :sellerId")
    List<Product> findAllBySellerId(@Param("sellerId") Long sellerId);

    @Query("SELECT AVG(p.averageRating) FROM Product p")
    Double calculateAverageRating();

    @Query("SELECT p FROM Product p WHERE p.categoryId = :categoryId")
    List<Product> findAllByCategoryId(@Param("categoryId") Long categoryId);

    @Query("SELECT p FROM Product p WHERE p.unlisted = false")
    List<Product> findListedProducts();

    @Query("SELECT p FROM Product p WHERE p.unlisted = true")
    List<Product> findUnlistedProducts();

    @Query("SELECT p FROM Product p WHERE p.stock > 0")
    List<Product> findProductsInStock();

    @Query("SELECT p FROM Product p WHERE p.stock <= :stockThreshold")
    List<Product> findProductsBelowStockThreshold(@Param("stockThreshold") int stockThreshold);

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

}
