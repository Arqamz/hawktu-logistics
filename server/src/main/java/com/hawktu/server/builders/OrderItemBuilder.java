package com.hawktu.server.builders;

import com.hawktu.server.states.OrderItemState;
import com.hawktu.server.states.ProcessingState;
import com.hawktu.server.models.Order;
import com.hawktu.server.models.OrderItem;
import com.hawktu.server.models.Product;
import com.hawktu.server.models.Address;


import java.math.BigDecimal;

public class OrderItemBuilder {
    private Order order;
    private Product product;
    private int quantity;
    private BigDecimal unitPrice;
    private Address deliveryAddress;
    private OrderItemState state;
    private String refundMessage;
    private String refundResponse;

    public OrderItemBuilder() {
        // Default state is Processing
        this.state = new ProcessingState();
    }

    public OrderItemBuilder withOrder(Order order) {
        this.order = order;
        return this;
    }

    public OrderItemBuilder withProduct(Product product) {
        this.product = product;
        return this;
    }

    public OrderItemBuilder withQuantity(int quantity) {
        this.quantity = quantity;
        return this;
    }

    public OrderItemBuilder withUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public OrderItemBuilder withDeliveryAddress(Address deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
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
        if (order == null) {
            throw new IllegalStateException("Order is required");
        }
        if (product == null) {
            throw new IllegalStateException("Product is required");
        }
        if (quantity <= 0) {
            throw new IllegalStateException("Quantity must be positive");
        }
        if (unitPrice == null || unitPrice.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalStateException("Unit price must be positive");
        }

        // Create the OrderItem
        OrderItem orderItem = new OrderItem(order, product, quantity, unitPrice, deliveryAddress);
        
        // Set additional fields if they were provided
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