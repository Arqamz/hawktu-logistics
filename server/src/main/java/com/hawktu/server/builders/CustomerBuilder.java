package com.hawktu.server.builders;

import com.hawktu.server.models.Customer;

public class CustomerBuilder extends UserBuilder<Customer, CustomerBuilder> {
    private Integer loyaltyPoints = 0;

    public CustomerBuilder loyaltyPoints(Integer loyaltyPoints) {
        this.loyaltyPoints = loyaltyPoints;
        return this;
    }

    @Override
    public Customer build() {
        Customer customer = new Customer();
        customer.setPassword(password);
        customer.setEmail(email);
        customer.setFirstName(firstName);
        customer.setLastName(lastName);
        customer.setPhoneNumber(phoneNumber);
        customer.setAddress(address);
        customer.setLoyaltyPoints(loyaltyPoints);
        return customer;
    }
}
