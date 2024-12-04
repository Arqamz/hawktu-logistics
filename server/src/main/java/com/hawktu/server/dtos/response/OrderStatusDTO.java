package com.hawktu.server.dtos.response;

import java.util.List;

public class OrderStatusDTO {
    private List<OrderItemStatusDTO> orderItems;

    public OrderStatusDTO() {}

    public OrderStatusDTO(List<OrderItemStatusDTO> orderItems) {
        this.orderItems = orderItems;
    }

    public List<OrderItemStatusDTO> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemStatusDTO> orderItems) {
        this.orderItems = orderItems;
    }
}

