package com.hawktu.server.factories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.hawktu.server.dtos.request.OrderItemDTO;
import com.hawktu.server.models.Order;
import com.hawktu.server.models.OrderItem;
import com.hawktu.server.repositories.OrderRepository;


public class OrderFactory {
    
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemFactory orderItemFactory;

    public Order createOrder(List<OrderItemDTO> orderItemDataList) {
        Order order = new Order();
        orderRepository.save(order);

        for (OrderItemDTO orderItemData : orderItemDataList) {
            OrderItem orderItem = orderItemFactory.createOrderItem(order.getId(), orderItemData.getProductId(), orderItemData.getUnitPrice(), orderItemData.getQuantity(), orderItemData.getDeliveryAddress());
            order.addOrderItem(orderItem);
        }

        orderRepository.save(order);
        return order;
    }
}