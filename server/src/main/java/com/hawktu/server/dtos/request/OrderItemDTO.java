package com.hawktu.server.dtos.request;

import com.hawktu.server.models.Address;

public class OrderItemDTO {
    
    private Long id;
    private int quantity;
    private Address deliveryAddress;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Address getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(Address deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }
    
     
}

//service will get list of these dtos,