package com.hawktu.server.dtos.response;

import java.util.List;

public class OrdersResponse {
    private List<OrderItemPayload> orders;

    public OrdersResponse(List<OrderItemPayload> orders) {
        this.orders = orders;
    }

    public List<OrderItemPayload> getOrders() {
        return orders;
    }

    public void setOrders(List<OrderItemPayload> orders) {
        this.orders = orders;
    }
}
