package com.hawktu.server.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Seller extends User {

    @Column(nullable = false)
    private String businessName;

    public Seller() {
        super();
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }
}
