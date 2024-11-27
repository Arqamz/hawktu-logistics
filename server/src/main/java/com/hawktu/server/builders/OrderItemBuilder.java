package com.hawktu.server.builders;

import java.math.BigDecimal;

import com.hawktu.server.models.Address;
import com.hawktu.server.models.OrderItem;

public class OrderItemBuilder {
    private Long orderId;
    private Long productId;
    private int quantity;
    private Address deliveryAddress;
    private BigDecimal unitPrice;

    public OrderItemBuilder() {}

    public OrderItemBuilder withOrderId(Long orderId) {
        this.orderId = orderId;
        return this;
    }

    public OrderItemBuilder withProductId(Long productId) {
        this.productId = productId;
        return this;
    }

    public OrderItemBuilder withQuantity(int quantity) {
        this.quantity = quantity;
        return this;
    }

    public OrderItemBuilder withDeliveryAddress(Address deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
        return this;
    }

    public OrderItemBuilder withUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public OrderItem build() {
        validateOrderItem();
        OrderItem orderItem = new OrderItem();
        orderItem.setOrderId(orderId);
        orderItem.setProductId(productId);
        orderItem.setQuantity(quantity);
        orderItem.setTotalPrice(unitPrice.multiply(BigDecimal.valueOf(this.quantity)));
        orderItem.setDeliveryAddress(deliveryAddress);

        return orderItem;
    }

    private void validateOrderItem() {
        if (orderId == null) {
            throw new IllegalStateException("Order ID is required");
        }
        if (productId == null) {
            throw new IllegalStateException("Product ID is required");
        }
        if (unitPrice == null) {
            throw new IllegalStateException("Unit price is required");
        }
        if (quantity <= 0) {
            throw new IllegalStateException("Quantity must be positive");
        }
    }
}
