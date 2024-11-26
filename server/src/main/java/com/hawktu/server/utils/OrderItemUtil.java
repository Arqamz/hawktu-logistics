package com.hawktu.server.utils;

import com.hawktu.server.states.OrderItemState;
import com.hawktu.server.states.ProcessingState;
import com.hawktu.server.models.Order;
import com.hawktu.server.models.Product;
import com.hawktu.server.models.Address;


import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItemUtil {

    private Product product;

    private int quantity;

    private BigDecimal totalPrice;

    private Address deliveryAddress;

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
        recalculateTotalPrice();
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setDeliveryAddress(Address deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public Address getDeliveryAddress() {
        return deliveryAddress;
    }
    private void recalculateTotalPrice() {
        this.totalPrice = this.product.getPrice().multiply(BigDecimal.valueOf(this.quantity));
    }


}
