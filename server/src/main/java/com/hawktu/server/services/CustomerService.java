package com.hawktu.server.services;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hawktu.server.dtos.request.ChangePasswordRequest;
import com.hawktu.server.dtos.request.CustomerRegisterRequest;
import com.hawktu.server.dtos.request.UpdateCustomerInfoRequest;
import com.hawktu.server.dtos.response.CustomerInfoResponse;
import com.hawktu.server.factories.CustomerFactory;
import com.hawktu.server.models.Customer;
import com.hawktu.server.models.User;
import com.hawktu.server.repositories.CustomerRepository;

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

    public CustomerInfoResponse getCustomerInfo(String email) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found."));
    
        return new CustomerInfoResponse(
                customer.getFirstName(),
                customer.getLastName(),
                customer.getPhoneNumber(),
                customer.getAddress(),
                customer.getWallet()
                
        );
    }    

    public void updateCustomerInfo(String email, UpdateCustomerInfoRequest request) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found."));
        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setPhoneNumber(request.getPhoneNumber());
        customer.setAddress(request.getAddress());
        customerRepository.save(customer);
    }

    public boolean changePassword(String email, ChangePasswordRequest request) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found."));

        if (!passwordEncoder.matches(request.getCurrentPassword(), customer.getPassword())) {
            return false;
        }

        customer.setPassword(passwordEncoder.encode(request.getNewPassword()));
        customerRepository.save(customer);
        return true;
    }

    //placing order functions
    public Customer getCustomerByEmail(String customerEmail) {
        return customerRepository.findByEmail(customerEmail)
            .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public void updateCustomerWallet(Customer customer, double amountToDeduct) {
        if (customer.getWallet() < amountToDeduct) {
            throw new RuntimeException("Insufficient wallet balance");
        }
        customer.setWallet(customer.getWallet() - amountToDeduct);
        customerRepository.save(customer);
    }

    public void updateCustomerLoyaltyPoints(Customer customer, int loyaltyPointsToAdd) {
        customer.setLoyaltyPoints(customer.getLoyaltyPoints() + loyaltyPointsToAdd);
        customerRepository.save(customer);
    }

    //customer dashboard functions
    public Optional<Integer> getCustomerLoyaltyPoints(String email) {
        return customerRepository.findByEmail(email)
            .map(Customer::getLoyaltyPoints);
    }

    public Optional<Double> getCustomerWalletBalance(String email) {
        return customerRepository.findByEmail(email)
            .map(User::getWallet);
    }

    @Transactional
    public Optional<Double> addFundsToWallet(String email, Double amount) {
        return customerRepository.findByEmail(email)
            .map(customer -> {
                customer.setWallet(customer.getWallet() + amount);
                return customerRepository.save(customer).getWallet();
            });
    }

    @Transactional
    public Optional<Double> redeemLoyaltyPoints(String email, Integer points) {
        return customerRepository.findByEmail(email)
            .map(customer -> {
                if (customer.getLoyaltyPoints() < points) {
                    return Optional.<Double>empty();
                }
                Double walletAddition = calculateWalletAddition(points);
                customer.setLoyaltyPoints(customer.getLoyaltyPoints() - points);
                customer.setWallet(customer.getWallet() + walletAddition);
                customerRepository.save(customer);

                return Optional.of(walletAddition);
            })
            .orElse(Optional.empty());
    }
    

    private Double calculateWalletAddition(Integer points) {
        switch (points) {
            case 100:
                return 1.0;
            case 200:
                return 5.0;
            case 500:
                return 10.0;
            case 1000:
                return 30.0;
            case 5000:
                return 200.0;
            default:
                return 0.0;
        }
    }

}