package com.hawktu.server.repositories;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hawktu.server.models.OrderItem;
import com.hawktu.server.states.orderitem.OrderItemStateEnum;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    // Fetch all order items by a specific order ID
    @Query("SELECT oi FROM OrderItem oi WHERE oi.orderId = :orderId")
    List<OrderItem> findAllByOrderId(Long orderId);

    // Fetch all order items in a specific state
    @Query("SELECT oi FROM OrderItem oi WHERE oi.state = :state")
    List<OrderItem> findAllByState(@Param("state") OrderItemStateEnum state);

    // Fetch order items by product ID
    @Query("SELECT oi FROM OrderItem oi WHERE oi.productId = :productId")
    List<OrderItem> findAllByProductId(Long productId);

    // Fetch order items with quantities greater than a threshold
    @Query("SELECT oi FROM OrderItem oi WHERE oi.quantity > :quantity")
    List<OrderItem> findItemsWithQuantityGreaterThan(int quantity);

    @Query("SELECT oi FROM OrderItem oi " +
           "JOIN Order o ON oi.orderId = o.id " +
           "JOIN Customer c ON o.customerId = c.id " +
           "WHERE oi.productId = :productId AND c.email = :email")
    Optional<OrderItem> findByProductIdAndCustomerEmail(
        @Param("productId") Long productId, 
        @Param("email") String email
    );

    @Query("SELECT SUM(oi.totalPrice) FROM OrderItem oi " +
    "JOIN Product p ON oi.productId = p.id " +
    "JOIN Seller s ON p.sellerId = s.id " +
    "JOIN Order o ON oi.orderId = o.id " +
    "WHERE s.email = :email " +
    "AND oi.state = 'DELIVERED' " +
    "AND (:startDate IS NULL OR o.createdAt >= :startDate) " +
    "AND (:endDate IS NULL OR o.createdAt <= :endDate)")
    BigDecimal calculateRevenueBySellerAndDateRange(@Param("email") String email, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT oi FROM OrderItem oi " +
    "JOIN Product p ON oi.productId = p.id " +
    "JOIN Seller s ON p.sellerId = s.id " +
    "JOIN Order o ON oi.orderId = o.id " +
    "WHERE s.email = :email " +
    "AND oi.state = 'DELIVERED' " +
    "AND (:startDate IS NULL OR o.createdAt >= :startDate) " +
    "AND (:endDate IS NULL OR o.createdAt <= :endDate)")
    List<OrderItem> findOrdersBySellerAndDateRange(@Param("email") String email, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("SELECT COUNT(oi) FROM OrderItem oi " +
    "JOIN Product p ON oi.productId = p.id " +
    "JOIN Seller s ON p.sellerId = s.id " +
    "JOIN Order o ON oi.orderId = o.id " +
    "WHERE s.email = :email " +
    "AND oi.state = 'DELIVERED' " +
    "AND (:startDate IS NULL OR o.createdAt >= :startDate) " +
    "AND (:endDate IS NULL OR o.createdAt <= :endDate)")
    Long countOrdersBySellerAndDateRange(@Param("email") String email, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);


}
