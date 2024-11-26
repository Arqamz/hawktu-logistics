package com.hawktu.server.repositories;

import com.hawktu.server.models.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {


    List<OrderItem> findByOrderId(Long orderId);

    List<OrderItem> findByProductId(Long productId);

    List<OrderItem> findByState(String state);
}
