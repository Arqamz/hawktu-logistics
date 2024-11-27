package com.hawktu.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hawktu.server.dtos.request.CustomerRegisterRequest;
import com.hawktu.server.dtos.request.LoginRequest;
import com.hawktu.server.dtos.request.RefreshTokenRequest;
import com.hawktu.server.dtos.request.SellerRegisterRequest;
import com.hawktu.server.dtos.response.LoginResponse;
import com.hawktu.server.dtos.response.TokenRefreshResponse;
import com.hawktu.server.services.CustomerService;
import com.hawktu.server.services.SellerService;
import com.hawktu.server.utils.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController extends BaseController {

    private final CustomerService customerService;
    private final SellerService sellerService;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthController(CustomerService customerService, SellerService sellerService, JwtUtil jwtUtil) {
        this.customerService = customerService;
        this.sellerService = sellerService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        logger.debug("Received login request for email: {}", loginRequest.getEmail());

        try {
            boolean isAuthenticated;
            String userEmail = loginRequest.getEmail();
            String password = loginRequest.getPassword();

            switch (loginRequest.getAccountType().toLowerCase()) {
                case "customer" -> isAuthenticated = customerService.authenticate(userEmail, password);
                case "seller" -> isAuthenticated = sellerService.authenticate(userEmail, password);
                default -> {
                    logger.error("Invalid account type: {}", loginRequest.getAccountType());
                    return badRequestError("Invalid account type");
                }
            }

            if (isAuthenticated) {
                String accessToken = jwtUtil.generateAccessToken(userEmail);
                String refreshToken = jwtUtil.generateRefreshToken(userEmail);
                
                logger.debug("Tokens generated for user: {}", userEmail);

                LoginResponse response = new LoginResponse(
                    accessToken,
                    refreshToken,
                    userEmail,
                    loginRequest.getAccountType()
                );
                
                return ResponseEntity.ok(response);
            } else {
                logger.error("Authentication failed for email: {}", userEmail);
                return unauthorizedError("Invalid credentials");
            }
        } catch (Exception e) {
            logger.error("Unexpected error during login: ", e);
            return internalServerError("Internal Server Error");
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest request) {
        logger.debug("Received refresh token request");
        
        try {
            String refreshToken = request.getRefreshToken();
            
            if (!jwtUtil.isRefreshToken(refreshToken)) {
                logger.error("Invalid refresh token type");
                return unauthorizedError("Invalid credentials");
            }

            String email = jwtUtil.extractUsername(refreshToken);
            if (!jwtUtil.validateToken(refreshToken, email)) {
                logger.error("Invalid or expired refresh token");
                return unauthorizedError("Invalid credentials");
            }

            String newAccessToken = jwtUtil.generateAccessToken(email);
            
            logger.debug("New access token generated for user: {}", email);

            return ResponseEntity.ok(new TokenRefreshResponse(newAccessToken));
        } catch (Exception e) {
            logger.error("Unexpected error during token refresh: ", e);
            return internalServerError("Internal Server Error");
        }
    }

    @PostMapping("/register/seller")
    public ResponseEntity<?> registerSeller(@RequestBody SellerRegisterRequest registerRequest) {
        logger.debug("Received seller registration request for email: {}", registerRequest.getEmail());

        try {
            boolean registrationResult = sellerService.register(registerRequest);

            if (registrationResult) {
                logger.info("Seller registered successfully: {}", registerRequest.getEmail());
                return ResponseEntity.ok("Seller registered successfully");
            } else {
                logger.error("Seller registration failed: {}", registerRequest.getEmail());
                return badRequestError("Invalid account type");
            }
        } catch (Exception e) {
            logger.error("Unexpected error during seller registration: ", e);
            return internalServerError("Internal Server Error");
        }
    }

    @PostMapping("/register/customer")
    public ResponseEntity<?> registerCustomer(@RequestBody CustomerRegisterRequest registerRequest) {
        logger.debug("Received customer registration request for email: {}", registerRequest.getEmail());

        try {
            boolean registrationResult = customerService.register(registerRequest);

            if (registrationResult) {
                logger.info("Customer registered successfully: {}", registerRequest.getEmail());
                return ResponseEntity.ok("Customer registered successfully");
            } else {
                logger.error("Customer registration failed: {}", registerRequest.getEmail());
                return badRequestError("Invalid account type");
            }
        } catch (Exception e) {
            logger.error("Unexpected error during customer registration: ", e);
            return internalServerError("Internal Server Error");
        }
    }

}