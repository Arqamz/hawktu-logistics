package com.hawktu.server.services;

import com.hawktu.server.models.User;
import com.hawktu.server.repositories.UserRepository;
import com.hawktu.server.factories.UserFactory;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(
        String username, 
        String rawPassword, 
        String email, 
        String firstName, 
        String lastName, 
        String phoneNumber
    ) {
        // Check if username or email already exists
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }

        // Create new user using UserFactory
        User newUser = UserFactory.createUser(
            username,
            passwordEncoder.encode(rawPassword),
            email,
            firstName,
            lastName,
            phoneNumber
        );

        return userRepository.save(newUser);
    }
    @Transactional
    public User updateUserProfile(Long userId, User user) {
        return userRepository.findById(userId)
            .map(existingUser -> {
                existingUser.setFirstName(user.getFirstName());
                existingUser.setLastName(user.getLastName());
                existingUser.setPhoneNumber(user.getPhoneNumber());
                
                return userRepository.save(existingUser);
            })
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public void changePassword(Long userId, String oldPassword, String newPassword) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Validate old password
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Invalid current password");
        }

        // Encode and save new password
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Transactional
    public void addWalletBalance(Long userId, Double amount) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (amount < 0) {
            throw new IllegalArgumentException("Cannot add negative balance");
        }

        user.setWalletBalance(user.getWalletBalance() + amount);
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}