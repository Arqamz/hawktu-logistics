package com.hawktu.server.builders;

import java.time.LocalDateTime;
import com.hawktu.server.models.Customer;

public class CustomerBuilder extends UserBuilder<Customer, CustomerBuilder> {
    private Integer loyaltyPoints = 0;

    public CustomerBuilder loyaltyPoints(Integer loyaltyPoints) {
        this.loyaltyPoints = loyaltyPoints;
        return this;
    }

    @Override
    public Customer build() {
        // Use default values if not set
        if (registeredAt == null) {
            registeredAt = LocalDateTime.now();
        }
        
        return new Customer(
            password, 
            email, 
            firstName, 
            lastName, 
            phoneNumber, 
            registeredAt, 
            wallet, 
            loyaltyPoints
        );
    }
}