package com.hawktu.server.builders;

import com.hawktu.server.models.Seller;

public class SellerBuilder extends UserBuilder<Seller, SellerBuilder> {
    private String businessName;

    public SellerBuilder businessName(String businessName) {
        this.businessName = businessName;
        return this;
    }

    @Override
    public Seller build() {
        validateSeller();
        Seller seller = new Seller();
        seller.setPassword(password);
        seller.setEmail(email);
        seller.setFirstName(firstName);
        seller.setLastName(lastName);
        seller.setPhoneNumber(phoneNumber);
        seller.setAddress(address);
        seller.setBusinessName(businessName);
        
        return seller;
    }

    private void validateSeller() {
        super.validateUser();
        if (businessName == null || businessName.isEmpty()) {
            throw new IllegalStateException("Business name is required for Seller");
        }
    }
}