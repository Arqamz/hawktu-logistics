package com.hawktu.server.models;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class Seller extends User {

    @Column(nullable = false)
    private String businessName;

    public Seller(String password, String email, String firstName, String lastName, String phoneNumber, LocalDateTime registeredAt, Double wallet, String businessName) {
        super(password, email, firstName, lastName, phoneNumber, registeredAt, wallet);
        this.businessName = businessName;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }
}
