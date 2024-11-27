package com.hawktu.server.factories;

import com.hawktu.server.models.Seller;
import com.hawktu.server.builders.SellerBuilder;

public class SellerFactory {
    

    public Seller createSeller(String email, String password, String firstName, String lastName, String phoneNumber, String businessName) {
        
        return new SellerBuilder()
            .email(email)
            .password(password)
            .firstName(firstName)
            .lastName(lastName)
            .phoneNumber(phoneNumber)
            .businessName(businessName)
            .build();

    }
}