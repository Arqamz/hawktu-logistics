package com.hawktu.server.factories;

import org.springframework.beans.factory.annotation.Autowired;

import com.hawktu.server.builders.CustomerBuilder;
import com.hawktu.server.models.Customer;

public class CustomerFactory {
    
    @Autowired

    public Customer createCustomer(String email, String password, String firstName, String lastName, String phoneNumber) {
        
        return new CustomerBuilder()
            .email(email)
            .password(password)
            .firstName(firstName)
            .lastName(lastName)
            .phoneNumber(phoneNumber)
            .build();


    }   
}