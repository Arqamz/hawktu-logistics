package com.hawktu.server.builders;

import com.hawktu.server.models.Seller;

public class SellerBuilder {
    private final Seller seller;

    public SellerBuilder() {
        seller = new Seller();
    }

    public SellerBuilder withUsername(String username) {
        seller.setUsername(username);
        return this;
    }

    public SellerBuilder withPassword(String password) {
        seller.setPassword(password);
        return this;
    }

    public SellerBuilder withEmail(String email) {
        seller.setEmail(email);
        return this;
    }

    public SellerBuilder withBusinessName(String businessName) {
        seller.setBusinessName(businessName);
        return this;
    }

    public SellerBuilder withContactNumber(String contactNumber) {
        seller.setContactNumber(contactNumber);
        return this;
    }

    public Seller build() {
        validateSeller();
        return seller;
    }

    private void validateSeller() {
        if (seller.getUsername() == null || seller.getUsername().trim().isEmpty()) {
            throw new IllegalStateException("Username cannot be empty");
        }
        // Add more validation as needed
    }
}