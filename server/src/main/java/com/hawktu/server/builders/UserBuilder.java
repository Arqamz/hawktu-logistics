package com.hawktu.server.builders;

import com.hawktu.server.models.User;
import java.time.LocalDateTime;

public class UserBuilder {
    private final User user;

    public UserBuilder() {
        this.user = new User();
        this.user.setRegisteredAt(LocalDateTime.now());
    }

    public UserBuilder username(String username) {
        user.setUsername(username);
        return this;
    }

    public UserBuilder password(String password) {
        user.setPassword(password);
        return this;
    }

    public UserBuilder email(String email) {
        user.setEmail(email);
        return this;
    }

    public UserBuilder firstName(String firstName) {
        user.setFirstName(firstName);
        return this;
    }

    public UserBuilder lastName(String lastName) {
        user.setLastName(lastName);
        return this;
    }

    public UserBuilder phoneNumber(String phoneNumber) {
        user.setPhoneNumber(phoneNumber);
        return this;
    }

    public UserBuilder walletBalance(Double balance) {
        user.setWalletBalance(balance);
        return this;
    }

    public UserBuilder loyaltyPoints(Integer points) {
        user.setLoyaltyPoints(points);
        return this;
    }

    public User build() {
        // Validate user object before returning
        validateUser();
        return user;
    }

    private void validateUser() {
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            throw new IllegalStateException("Username is required");
        }
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new IllegalStateException("Password is required");
        }
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            throw new IllegalStateException("Email is required");
        }
    }
}
