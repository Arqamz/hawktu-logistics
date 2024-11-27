package com.hawktu.server.factories;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;

import com.hawktu.server.builders.CustomerBuilder;
import com.hawktu.server.models.Customer;
import com.hawktu.server.repositories.CustomerRepository;

public class CustomerFactory {
    
    @Autowired
    private CustomerRepository customerRepository;

    public Customer createCustomer(String email, String password, String firstName, String lastName, String phoneNumber) {
        
        Customer customer =  new CustomerBuilder()
            .email(email)
            .password(password)
            .firstName(firstName)
            .lastName(lastName)
            .phoneNumber(phoneNumber)
            .registeredAt(LocalDateTime.now())
            .wallet(0.0)
            .loyaltyPoints(0)
            .build();

        customerRepository.save(customer);
        return customer;
    }   
}