package com.hawktu.server.factories;

import org.springframework.stereotype.Component;

import com.hawktu.server.builders.CustomerBuilder;
import com.hawktu.server.models.Customer;
import com.hawktu.server.models.Address;

@Component
public class CustomerFactory {
    public Customer createCustomer(String email, String password, String firstName, String lastName, String phoneNumber, Address address) {
        return new CustomerBuilder()
            .email(email)
            .password(password)
            .firstName(firstName)
            .lastName(lastName)
            .phoneNumber(phoneNumber)
            .address(address)
            .build();
    }
}