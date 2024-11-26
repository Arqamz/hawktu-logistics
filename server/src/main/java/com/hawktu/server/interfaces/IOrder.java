package com.hawktu.server.interfaces;

import java.time.LocalDateTime;
import java.util.List;

import com.hawktu.server.models.OrderItem;

public interface IOrder {

    Long getId();
    List<OrderItem> getOrderItems();
    void addOrderItem(OrderItem item);
    void removeOrderItem(OrderItem item);
    LocalDateTime getCreatedAt();
}
