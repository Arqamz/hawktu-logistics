package com.hawktu.server.dtos.response;

import java.math.BigDecimal;

import com.hawktu.server.models.Address;
import com.hawktu.server.states.orderitem.OrderItemStateEnum;

public class OrderItemPayload {
    private Long id;
    private String customerName;
    private Long orderId;
    private Long productId;
    private int quantity;
    private BigDecimal totalPrice;
    private Address deliveryAddress;
    private OrderItemStateEnum state;
    private String refundMessage;
    private String refundResponse;

    public OrderItemPayload(Long id, String customerName, Long orderId, Long productId, int quantity, BigDecimal totalPrice, Address deliveryAddress, OrderItemStateEnum state, String refundMessage, String refundResponse) {
        this.id = id;
        this.customerName = customerName;
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.deliveryAddress = deliveryAddress;
        this.state = state;
        this.refundMessage = refundMessage;
        this.refundResponse = refundResponse;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getcustomerName() {
        return customerName;
    }

    public void setcustomerName(String customerName) {
        this.customerName = customerName;
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

    public Address deliveryAddress() {
        return deliveryAddress;
    }

    public void deliveryAddress(Address deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public OrderItemStateEnum getState() {
        return state;
    }

    public void setState(OrderItemStateEnum state) {
        this.state = state;
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
}
