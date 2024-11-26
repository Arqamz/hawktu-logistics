package com.hawktu.server.factories;

import com.hawktu.server.builders.OrderItemBuilder;
import com.hawktu.server.models.Order;
import com.hawktu.server.models.OrderItem;
import com.hawktu.server.utils.OrderItemUtil;
import com.hawktu.server.models.Product;
import com.hawktu.server.models.Address;

import java.math.BigDecimal;

public class OrderItemFactory {

    // Default creator using the builder
    public OrderItem createDefaultOrderItem(Order order, Product product, int quantity, BigDecimal unitPrice, Address deliveryAddress) {
        return new OrderItemBuilder()
                .withOrder(order)
                .withProduct(product)
                .withQuantity(quantity)
                .withUnitPrice(unitPrice)
                .withDeliveryAddress(deliveryAddress)
                .build();
    }

    // Creator using Order and OrderItemUtil
    public OrderItem createOrderItemFromUtil(Order order, OrderItemUtil orderItemUtil) {
        return new OrderItemBuilder()
                .withOrder(order)
                .withProduct(orderItemUtil.getProduct())
                .withQuantity(orderItemUtil.getQuantity())
                .withUnitPrice(orderItemUtil.getTotalPrice().divide(BigDecimal.valueOf(orderItemUtil.getQuantity())))
                .withDeliveryAddress(orderItemUtil.getDeliveryAddress())
                .build();
    }
}
