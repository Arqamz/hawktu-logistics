package com.hawktu.server.controllers;

import com.hawktu.server.services.CustomerService;
import com.hawktu.server.services.ShopService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/customer/dashboard")
public class CustomerDashboardController {
    
    @Autowired
    private final CustomerService customerService;
    
    @Autowired
    public CustomerDashboardController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/loyalty-points")
    public ResponseEntity<Optional<Integer>> getCustomerLoyaltyPoints(@RequestParam String email) {
        Optional<Integer> loyaltyPoints = customerService.getCustomerLoyaltyPoints(email);
        return ResponseEntity.ok(loyaltyPoints);
    }

    @GetMapping("/wallet-balance")
    public ResponseEntity<Optional<Double>> getCustomerWalletBalance(@RequestParam String email) {
        Optional<Double> walletBalance = customerService.getCustomerWalletBalance(email);
        return ResponseEntity.ok(walletBalance);
    }

    @PostMapping("/add-wallet-funds")
    public ResponseEntity<?> addWalletFunds(
        @RequestParam String email, 
        @RequestParam Double amount
    ) {
        if (amount <= 0) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Amount must be greater than zero");
        }

        Optional<Double> updatedBalance = customerService.addFundsToWallet(email, amount);
        
        if (updatedBalance.isPresent()) {
            return ResponseEntity.ok(updatedBalance.get());
        } else {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Customer not found with email: " + email);
        }
    }
}