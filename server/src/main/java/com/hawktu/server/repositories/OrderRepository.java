package com.hawktu.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hawktu.server.models.Order;
import com.hawktu.server.models.OrderItem;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Fetch the count of all orders
    @Query("SELECT COUNT(o) FROM Order o")
    long getOrderCount();

    // Fetch all orders
    @Query("SELECT o FROM Order o")
    List<Order> findAllOrders();

    // Fetch an order by ID
    @Query("SELECT o FROM Order o WHERE o.id = :orderId")
    Order findOrderById(Long orderId);

    // Join Order and OrderItem entities to fetch items based on a condition
    @Query("""
           SELECT oi 
           FROM OrderItem oi 
           JOIN Order o ON oi.orderId = o.id
           WHERE oi.state = 'PROCESSING'
           """)
    List<OrderItem> findProcessingItems();

    // Fetch orders with a specific product in their items
    @Query("""
           SELECT DISTINCT o
           FROM Order o 
           JOIN OrderItem oi ON o.id = oi.orderId
           WHERE oi.productId = :productId
           """)
    List<Order> findOrdersByProductId(Long productId);
}
