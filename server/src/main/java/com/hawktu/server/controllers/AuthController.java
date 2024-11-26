package com.hawktu.server.controllers;

import com.hawktu.server.dtos.request.*;
import com.hawktu.server.dtos.response.*;
import com.hawktu.server.models.Customer;
import com.hawktu.server.repositories.CustomerRepository;
import com.hawktu.server.utils.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/auth")
public class AuthController {

    private final CustomerRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final Logger logger = LoggerFactory.getLogger(AuthController.class);

    public AuthController(CustomerRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        logger.debug("Received login request for email: {}", request.getEmail());

        try {
            Optional<Customer> userOptional = userRepository.findByEmail(request.getEmail());
            if (userOptional.isEmpty()) {
                logger.error("User not found: {}", request.getEmail());
                return ResponseEntity.status(401).body(new ErrorResponse("Invalid email or password", 401));
            }
            
            Customer user = userOptional.get();
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                logger.error("Password mismatch for user: {}", user.getEmail());
                return ResponseEntity.status(401).body(new ErrorResponse("Invalid email or password", 401));
            }

            String accessToken = jwtUtil.generateAccessToken(user.getEmail());
            String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());
            
            logger.debug("Tokens generated for user: {}", user.getEmail());

            LoginResponse response = new LoginResponse(
                accessToken,
                refreshToken,
                user.getEmail(),
                user.getFirstName()
            );
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Unexpected error during login: ", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Internal Server Error", 500));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest request) {
        logger.debug("Received refresh token request");
        
        try {
            String refreshToken = request.getRefreshToken();
            
            // Validate refresh token
            if (!jwtUtil.isRefreshToken(refreshToken)) {
                logger.error("Invalid refresh token type");
                return ResponseEntity.status(401).body(new ErrorResponse("Invalid refresh token", 401));
            }

            String email = jwtUtil.extractUsername(refreshToken);
            if (!jwtUtil.validateToken(refreshToken, email)) {
                logger.error("Invalid or expired refresh token");
                return ResponseEntity.status(401).body(new ErrorResponse("Invalid or expired refresh token", 401));
            }

            // Generate new access token
            String newAccessToken = jwtUtil.generateAccessToken(email);
            
            logger.debug("New access token generated for user: {}", email);

            return ResponseEntity.ok(new TokenRefreshResponse(newAccessToken));
        } catch (Exception e) {
            logger.error("Unexpected error during token refresh: ", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Internal Server Error", 500));
        }
    }
}