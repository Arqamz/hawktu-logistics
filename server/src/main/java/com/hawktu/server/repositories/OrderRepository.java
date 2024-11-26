package com.hawktu.server.repositories;

import com.hawktu.server.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Fetch all orders for a specific customer
    List<Order> findByCustomerId(Long customerId);

    // Fetch all orders containing items sold by a specific seller
    List<Order> findByOrderItemsSellerId(Long sellerId);

    // Custom logic for refund processing
    List<Order> findByOrderItemsStatus(String status); // For filtering "processing refund" orders
}
