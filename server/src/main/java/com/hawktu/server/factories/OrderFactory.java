package com.hawktu.server.factories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.hawktu.server.dtos.request.OrderItemDTO;
import com.hawktu.server.models.Order;
import com.hawktu.server.models.OrderItem;
import com.hawktu.server.repositories.OrderItemRepository;
import com.hawktu.server.repositories.OrderRepository;

@Component
public class OrderFactory {
    
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderItemFactory orderItemFactory;

    public Order createOrder(Long customerId, List<OrderItemDTO> orderItemDataList) {
        Order order = new Order(customerId);
        orderRepository.save(order);

        for (OrderItemDTO orderItemData : orderItemDataList) {
            OrderItem orderItem = orderItemFactory.createOrderItem(order.getId(), orderItemData.getProductId(), orderItemData.getUnitPrice(), orderItemData.getQuantity(), orderItemData.getDeliveryAddress());
            orderItemRepository.save(orderItem);
            order.addOrderItem(orderItem);
        }

        orderRepository.save(order);
        return order;
    }
}