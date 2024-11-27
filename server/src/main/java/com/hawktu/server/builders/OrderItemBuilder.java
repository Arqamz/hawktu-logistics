package com.hawktu.server.builders;

import java.math.BigDecimal;

import com.hawktu.server.models.Address;
import com.hawktu.server.models.OrderItem;
import com.hawktu.server.states.OrderItemState;
import com.hawktu.server.states.ProcessingState;


public class OrderItemBuilder {
    private Long orderId;
    private Long productId;
    private int quantity;
    private Address deliveryAddress;
    private OrderItemState state;
    private String refundMessage;
    private String refundResponse;
    private BigDecimal unitPrice;

    public OrderItemBuilder() {
        this.state = new ProcessingState();
    }

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

    public OrderItemBuilder withState(OrderItemState state) {
        this.state = state;
        return this;
    }

    public OrderItemBuilder withRefundMessage(String refundMessage) {
        this.refundMessage = refundMessage;
        return this;
    }

    public OrderItemBuilder withRefundResponse(String refundResponse) {
        this.refundResponse = refundResponse;
        return this;
    }

    public OrderItem build() {
        // Validate required fields
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

        OrderItem orderItem = new OrderItem();
        orderItem.setOrderId(orderId);
        orderItem.setProductId(productId);
        orderItem.setQuantity(quantity);
        orderItem.setTotalPrice(unitPrice.multiply(BigDecimal.valueOf(this.quantity)));
        orderItem.setDeliveryAddress(deliveryAddress);

        if (state != null) {
            orderItem.setState(state);
        }
        if (refundMessage != null) {
            orderItem.setRefundMessage(refundMessage);
        }
        if (refundResponse != null) {
            orderItem.setRefundResponse(refundResponse);
        }

        return orderItem;
    }
}
