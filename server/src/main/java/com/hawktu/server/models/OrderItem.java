package com.hawktu.server.models;

import java.math.BigDecimal;

import com.hawktu.server.states.OrderItemState;
import com.hawktu.server.states.orderitem.OrderItemStateEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private BigDecimal totalPrice;

    @Column(name = "delivery_address", length = 500)
    private String deliveryAddressString;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderItemStateEnum state;

    @Column(length = 500)
    private String refundMessage;

    @Column(length = 500)
    private String refundResponse;

    public OrderItem() {
        this.state = OrderItemStateEnum.PROCESSING;
    }

    public Long getId() {
        return id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }
    
    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Transient  // Don't persist this method
    public OrderItemState getCurrentState() {
        return state.getStateInstance();
    }

    public OrderItemStateEnum getState() {
        return state;
    }

    public void setState(OrderItemStateEnum state) {
        this.state = state;
    }

    public Address getDeliveryAddress() {
        if (deliveryAddressString != null) {
            return Address.fromStringRepresentation(deliveryAddressString);
        }
        return null;
    }
    
    public void setDeliveryAddress(Address deliveryAddress) {
        if (deliveryAddress != null) {
            this.deliveryAddressString = deliveryAddress.toStringRepresentation();
        }
    }

    public String getRefundMessage() {
        return refundMessage;
    }

    public void setRefundMessage(String refundMessage) {
        this.refundMessage = refundMessage;
    }

    public String getRefundResponse() {
        return refundResponse;
    }

    public void setRefundResponse(String refundResponse) {
        this.refundResponse = refundResponse;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderItem)) return false;
        OrderItem orderItem = (OrderItem) o;
        return id != null && id.equals(orderItem.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
