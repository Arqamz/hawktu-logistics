package com.hawktu.server.controller;

import com.hawktu.server.dto.request.LoginRequest;
import com.hawktu.server.dto.response.LoginResponse;
import com.hawktu.server.dto.ErrorResponse;
import com.hawktu.server.model.User;
import com.hawktu.server.repository.UserRepository;
import com.hawktu.server.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        
        if (userOptional.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOptional.get().getPasswordHash())) {
            ErrorResponse errorResponse = new ErrorResponse("Invalid email or password", 401);
            return ResponseEntity.status(401).body(errorResponse);
        }

        User user = userOptional.get();
        String token = jwtUtil.generateToken(user.getEmail());

        LoginResponse response = new LoginResponse(token, user.getEmail(), user.getName());
        return ResponseEntity.ok(response);
    }
}
