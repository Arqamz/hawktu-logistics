package com.hawktu.server.models;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class Customer extends User {

    @Column(nullable = false)
    private Integer loyaltyPoints = 0;

    public Customer(String password, String email, String firstName, String lastName, String phoneNumber, LocalDateTime registeredAt, Double wallet, Integer loyaltyPoints) {
        super(password, email, firstName, lastName, phoneNumber, registeredAt, wallet);
        this.loyaltyPoints = loyaltyPoints;
    }

    public Integer getLoyaltyPoints() {
        return loyaltyPoints;
    }

    public void setLoyaltyPoints(Integer loyaltyPoints) {
        this.loyaltyPoints = loyaltyPoints;
    }
}
