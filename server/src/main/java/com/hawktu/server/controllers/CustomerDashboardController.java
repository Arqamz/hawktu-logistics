package com.hawktu.server.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hawktu.server.services.CustomerService;
import com.hawktu.server.utils.JwtUtil;

@RestController
@RequestMapping("/customer")
public class CustomerDashboardController extends BaseController {
    
    @Autowired
    private final CustomerService customerService;

    private final JwtUtil jwtUtil;
        
    @Autowired
    public CustomerDashboardController(CustomerService customerService, JwtUtil jwtUtil) {
        this.customerService = customerService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/loyalty-points")
    public ResponseEntity<?> getCustomerLoyaltyPoints(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);
            
            if (!jwtUtil.validateToken(token, email)) {
                return unauthorizedError("Invalid or expired token.");
            }

            Optional<Integer> loyaltyPoints = customerService.getCustomerLoyaltyPoints(email);
            
            if (loyaltyPoints.isPresent()) {
                return ResponseEntity.ok(loyaltyPoints.get());
            } else {
                return notFoundError("Customer not found with email: " + email);
            }
        } catch (Exception e) {
            return internalServerError("Couldn't retrieve loyalty points");
        }
    }

    @GetMapping("/wallet-balance")
    public ResponseEntity<?> getCustomerWalletBalance(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);
            
            if (!jwtUtil.validateToken(token, email)) {
                return unauthorizedError("Invalid or expired token.");
            }

            Optional<Double> walletBalance = customerService.getCustomerWalletBalance(email);
            
            if (walletBalance.isPresent()) {
                return ResponseEntity.ok(walletBalance.get());
            } else {
                return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Customer not found with email: " + email);
            }
        } catch (Exception e) {
            return internalServerError("Couldn't retrieve wallet balance");
        }
    }

    @PostMapping("/add-wallet-funds")
    public ResponseEntity<?> addWalletFunds(
        @RequestHeader("Authorization") String authHeader,
        @RequestParam Double amount
    ) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);
            
            if (!jwtUtil.validateToken(token, email)) {
                return unauthorizedError("Invalid or expired token.");
            }

            if (amount <= 0) {
                return badRequestError("Amount must be greater than zero");
            }

            Optional<Double> updatedBalance = customerService.addFundsToWallet(email, amount);
            
            if (updatedBalance.isPresent()) {
                return ResponseEntity.ok(updatedBalance.get());
            } else {
                return notFoundError("Not found");
            }
        } catch (Exception e) {
            return internalServerError("Couldn't add funds to wallet");
        }
    }

    @PostMapping("/redeem-loyalty-points") 
    public ResponseEntity<?> redeemLoyaltyPoints( 
        @RequestHeader("Authorization") String authHeader, 
        @RequestParam Integer points 
    ) { 
        try { 
            String token = authHeader.replace("Bearer ", ""); 
            String email = jwtUtil.extractUsername(token); 
                
            if (!jwtUtil.validateToken(token, email)) { 
                return unauthorizedError("Invalid or expired token."); 
            } 
    
            Optional<Double> redemptionResult = customerService.redeemLoyaltyPoints(email, points);
            
            if (redemptionResult.isPresent()) {
                return ResponseEntity.ok("Loyalty points redeemed successfully");
            } else {
                return badRequestError("Unable to redeem loyalty points. Check your balance or point value.");
            }
        } catch (Exception e) { 
            return internalServerError("Couldn't redeem loyalty points"); 
        } 
    }

    @PostMapping("/cancel-order")
    public ResponseEntity<?> cancelOrder(
        @RequestHeader("Authorization") String authHeader,
        @RequestParam Long productId
    ) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);
            
            boolean result = customerService.cancelOrder(email, productId);
            if (!result) {
                return notFoundError("No order found of that id");
            }
            return ResponseEntity.ok("Order cancelled successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }
}