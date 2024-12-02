package com.hawktu.server.repositories;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

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

    // Fetch total revenue generated (sum of totalPrice)
    @Query("SELECT SUM(oi.totalPrice) FROM OrderItem oi")
    BigDecimal calculateTotalRevenue();

    // Fetch order items by product ID
    @Query("SELECT oi FROM OrderItem oi WHERE oi.productId = :productId")
    List<OrderItem> findAllByProductId(Long productId);

    // Fetch order items with quantities greater than a threshold
    @Query("SELECT oi FROM OrderItem oi WHERE oi.quantity > :quantity")
    List<OrderItem> findItemsWithQuantityGreaterThan(int quantity);

    // Calculate wallet balance by seller
    @Query("SELECT SUM(oi.totalPrice) FROM OrderItem oi WHERE oi.sellerId = :sellerId")
    BigDecimal calculateWalletBalanceBySeller(@Param("sellerId") String sellerId);

    // Calculate monthly revenue by seller
    @Query("SELECT SUM(oi.totalPrice) FROM OrderItem oi WHERE oi.sellerId = :sellerId AND oi.state = 'completed' AND FUNCTION('YEAR', oi.createdAt) = FUNCTION('YEAR', :date) AND FUNCTION('MONTH', oi.createdAt) = FUNCTION('MONTH', :date)")
    BigDecimal calculateMonthlyRevenueBySeller(@Param("sellerId") String sellerId, @Param("date") LocalDate date);

    // Count orders by seller
    @Query("SELECT COUNT(oi) FROM OrderItem oi WHERE oi.sellerId = :sellerId")
    List<OrderItem> countOrdersBySeller(@Param("sellerId") Long sellerId);

    // Fetch all orders by seller
    @Query("SELECT oi FROM OrderItem oi WHERE oi.sellerId = :sellerId")
    List<OrderItem> findAllBySeller(@Param("sellerId") String sellerId);

    // // Fetch recent orders by seller
    // @Query("SELECT oi FROM OrderItem oi WHERE oi.sellerId = :sellerId ORDER BY oi.createdAt DESC")
    // List<OrderItem> findRecentOrdersBySeller(@Param("sellerId") String sellerId, Pageable pageable);
}
