package com.hawktu.server.dtos.request;

import com.hawktu.server.models.Address;
import com.hawktu.server.dtos.request.CartProductDTO;
import java.util.List;



public class CartDTO {
    private Long userId;
    private List<CartProductDTO> cartProducts;
    private Address deliveryAddress; // Added this field

    public CartDTO() {}

    public CartDTO(Long userId, List<CartProductDTO> cartProducts, Address deliveryAddress) {
        this.userId = userId;
        this.cartProducts = cartProducts;
        this.deliveryAddress = deliveryAddress;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
