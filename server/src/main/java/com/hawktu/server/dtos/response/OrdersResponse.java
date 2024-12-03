package com.hawktu.server.dtos.response;

import java.util.List;

import com.hawktu.server.models.OrderItem;

public class OrdersResponse {
    private List<OrderItem> orders;

    public OrdersResponse(List<OrderItem> orders) {
        this.orders = orders;
    }

    public List<OrderItem> getOrders() {
        return orders;
    }

    public void setOrders(List<OrderItem> orders) {
        this.orders = orders;
    }
}
