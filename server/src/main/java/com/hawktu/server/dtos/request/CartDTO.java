package com.hawktu.server.dtos.request;

import java.util.List;

import com.hawktu.server.models.Address;



public class CartDTO {
    private String email;
    private List<CartProductDTO> cartProducts;
    private Address deliveryAddress; // Added this field

    public CartDTO() {}

    public CartDTO(String email, List<CartProductDTO> cartProducts, Address deliveryAddress) {
        this.email = email;
        this.cartProducts = cartProducts;
        this.deliveryAddress = deliveryAddress;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<CartProductDTO> getCartProducts() {
        return cartProducts;
    }

    public void setCartProducts(List<CartProductDTO> cartProducts) {
        this.cartProducts = cartProducts;
    }

    public Address getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(Address deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }
}
