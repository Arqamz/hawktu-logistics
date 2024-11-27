package com.hawktu.server.services;

import com.hawktu.server.models.Customer;
import com.hawktu.server.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.hawktu.server.factories.CustomerFactory;
import com.hawktu.server.dtos.request.CustomerRegisterRequest;

import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private CustomerFactory customerFactory;

    @Autowired
    public CustomerService(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private final CustomerRepository customerRepository;

    public boolean authenticate(String email, String password) {
        Optional<Customer> customerOptional = customerRepository.findByEmail(email);
        
        return customerOptional.map(customer -> 
            passwordEncoder.matches(password, customer.getPassword())
        ).orElse(false);
    }

    public Optional<Customer> findByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    public boolean register(CustomerRegisterRequest user) {
        Optional<Customer> existingCustomer = customerRepository.findByEmail(user.getEmail());
        if (existingCustomer.isPresent()) {
            return false;
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Customer customer = customerFactory.createCustomer(user.getEmail(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getPhoneNumber(), user.getAddress());
        customerRepository.save(customer);
        return true;
    }
}