package com.hawktu.server.factories;

import com.hawktu.server.models.Seller;
import com.hawktu.server.repositories.SellerRepository;
import com.hawktu.server.builders.SellerBuilder;

public class SellerFactory {
    
    public SellerRepository sellerRepository;

    public Seller createDefaultSeller(String email, String password, String firstName, String lastName, String phoneNumber, String businessName) {
        
        Seller seller =  new SellerBuilder()
            .email(email)
            .password(password)
            .firstName(firstName)
            .lastName(lastName)
            .phoneNumber(phoneNumber)
            .businessName(businessName)
            .build();
        
        sellerRepository.save(seller);
        return seller;

    }
}