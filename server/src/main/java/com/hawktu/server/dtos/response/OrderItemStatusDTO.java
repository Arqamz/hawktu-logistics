package com.hawktu.server.dtos.response;

import com.hawktu.server.models.OrderItem;
import com.hawktu.server.states.orderitem.OrderItemStateEnum;
import com.hawktu.server.models.Address;
import java.math.BigDecimal;


public class OrderItemStatusDTO {
    private Long id;
    private Long productId;
    private int quantity;
    private BigDecimal totalPrice;
    private Address Address;
    private OrderItemStateEnum state;
    private String productName;
    private String refundMessage;
    private String refundResponse;

    // Constructors
    public OrderItemStatusDTO() {}

    public OrderItemStatusDTO(OrderItem orderItem, String productName) {
        this.id = orderItem.getId();
        this.productId = orderItem.getProductId();
        this.quantity = orderItem.getQuantity();
        this.productName = productName;
        this.totalPrice = orderItem.getTotalPrice();
        this.Address = orderItem.getDeliveryAddress();
        this.state = orderItem.getState();
        this.refundMessage = orderItem.getRefundMessage();
        this.refundResponse = orderItem.getRefundResponse();
    }

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
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

    public Address getDeliveryAddressString() {
        return Address;
    }

    public void setDeliveryAddressString(Address Address) {
        this.Address = Address;
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
