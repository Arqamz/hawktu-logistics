package com.hawktu.server.factories;

import com.hawktu.server.models.Order;
import com.hawktu.server.models.OrderItem;
import com.hawktu.server.models.Product;
import com.hawktu.server.models.Address;
import com.hawktu.server.repositories.OrderRepository;
import com.hawktu.server.utils.OrderItemUtil;
import com.hawktu.server.repositories.OrderItemRepository;
import com.hawktu.server.dtos.request.OrderItemDTO;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

public class OrderFactory {
    
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderItemFactory orderItemFactory;



    private OrderItem createOrderItem(OrderItemUtil orderItemUtil, Order order) {
        OrderItem orderItem = orderItemFactory.createOrderItemFromUtil(order, orderItemUtil);
        orderItemRepository.save(orderItem);
        return orderItem;
    }

    public Order createOrder(List<OrderItemUtil> orderItemDataList) {
        Order order = new Order();
        orderRepository.save(order);

        for (OrderItemUtil orderItemData : orderItemDataList) {
            OrderItem orderItem = createOrderItem(orderItemData, order);
            order.addOrderItem(orderItem); 
        }

        orderRepository.save(order);
        return order;
    }
}


