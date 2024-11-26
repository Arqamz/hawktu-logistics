package com.hawktu.server.builders;

import com.hawktu.server.models.Seller;


import java.time.LocalDateTime;

public class SellerBuilder extends UserBuilder<Seller, SellerBuilder> {
    private String businessName;

    public SellerBuilder businessName(String businessName) {
        this.businessName = businessName;
        return this;
    }

    @Override
    public Seller build() {
        // Use default values if not set
        if (registeredAt == null) {
            registeredAt = LocalDateTime.now();
        }
        
        return new Seller(
            password, 
            email, 
            firstName, 
            lastName, 
            phoneNumber, 
            registeredAt, 
            wallet, 
            businessName
        );
    }
}