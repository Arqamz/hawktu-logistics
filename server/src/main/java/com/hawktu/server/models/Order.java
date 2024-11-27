package com.hawktu.server.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.hawktu.server.interfaces.IOrder;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order implements IOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "order_id") 
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
        item.setOrderId(this.id);
        items.add(item);
    }

    @Override
    public void removeOrderItem(OrderItem item) {
        items.remove(item);
        item.setOrderId(null);
    }

    @Override
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
