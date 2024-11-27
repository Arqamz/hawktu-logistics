package com.hawktu.server.factories;

import org.springframework.stereotype.Component;

import com.hawktu.server.builders.SellerBuilder;
import com.hawktu.server.models.Seller;
import com.hawktu.server.models.Address;

@Component
public class SellerFactory {
    public Seller createSeller(String email, String password, String firstName, String lastName, String phoneNumber, String businessName, Address address) {
        return new SellerBuilder()
            .email(email)
            .password(password)
            .firstName(firstName)
            .lastName(lastName)
            .phoneNumber(phoneNumber)
            .address(address)
            .businessName(businessName)
            .build();
    }
}