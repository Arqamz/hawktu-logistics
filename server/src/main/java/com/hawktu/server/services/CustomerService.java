package com.hawktu.server.services;

import com.hawktu.server.models.Customer;
import com.hawktu.server.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.hawktu.server.factories.CustomerFactory;
import com.hawktu.server.dtos.request.CustomerRegisterRequest;

import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private CustomerFactory customerFactory;

    @Autowired
    public CustomerService(CustomerRepository customerRepository, BCryptPasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    
    public boolean authenticate(String email, String password) {
        // Find the customer by email
        Optional<Customer> customerOptional = customerRepository.findByEmail(email);
        
        // If customer exists, check the password
        return customerOptional.map(customer -> 
            passwordEncoder.matches(password, customer.getPassword())
        ).orElse(false);
    }

    // Additional methods can be added as needed
    public Optional<Customer> findByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    public boolean register(CustomerRegisterRequest user) {
        Optional<Customer> existingCustomer = customerRepository.findByEmail(user.getEmail());
        if (existingCustomer.isPresent()) {
            return false;
        }

        // Encrypt the password and save the customer
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Customer customer = customerFactory.createCustomer(user.getEmail(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getPhoneNumber());
        customerRepository.save(customer);
        return true;
    }
}