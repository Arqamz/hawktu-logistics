package com.hawktu.server.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.hawktu.server.interfaces.IOrder;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order implements IOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<OrderItem> items = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private final LocalDateTime createdAt;

    public Order() {
        this.createdAt = LocalDateTime.now();
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public List<OrderItem> getOrderItems() {
        return items;
    }

    @Override
    public void addOrderItem(OrderItem item) {
        item.setOrder(this);
        items.add(item);
    }

    @Override
    public void removeOrderItem(OrderItem item) {
        items.remove(item);
        item.setOrder(null);
    }

    @Override
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
