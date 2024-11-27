package com.hawktu.server.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Customer extends User {

    @Column(nullable = false)
    private Integer loyaltyPoints;

    public Customer() {
        super();
        loyaltyPoints = 10;
    }

    public Integer getLoyaltyPoints() {
        return loyaltyPoints;
    }

    public void setLoyaltyPoints(Integer loyaltyPoints) {
        this.loyaltyPoints = loyaltyPoints;
    }
}

