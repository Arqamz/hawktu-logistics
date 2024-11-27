package com.hawktu.server.factories;

import java.math.BigDecimal;

import com.hawktu.server.builders.OrderItemBuilder;
import com.hawktu.server.models.Address;
import com.hawktu.server.models.OrderItem;

public class OrderItemFactory {
    public OrderItem createOrderItem(Long orderId, Long productId, BigDecimal unitPrice, int quantity, Address deliveryAddress) {
        return new OrderItemBuilder()
            .withOrderId(orderId)
            .withProductId(productId)
            .withQuantity(quantity)
            .withUnitPrice(unitPrice)
            .withDeliveryAddress(deliveryAddress)
            .build();
    }
}
