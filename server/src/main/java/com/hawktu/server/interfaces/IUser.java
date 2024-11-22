package com.hawktu.server.interfaces;

/**
 * Interface defining core user operations and behaviors
 * This follows the Interface Segregation Principle by defining clear contract for User implementations
 */
import java.time.LocalDateTime;

public interface IUser {
    // Added setter for id to match the implementation
    void setId(Long id);
    Long getId();

    String getUsername();
    void setUsername(String username);

    String getPassword();
    void setPassword(String password);

    String getEmail();
    void setEmail(String email);

    String getFirstName();
    void setFirstName(String firstName);

    String getLastName();
    void setLastName(String lastName);

    String getPhoneNumber();
    void setPhoneNumber(String phoneNumber);

    LocalDateTime getRegisteredAt();
    void setRegisteredAt(LocalDateTime registeredAt);

    Double getWalletBalance();
    void setWalletBalance(Double walletBalance);

    Integer getLoyaltyPoints();
    void setLoyaltyPoints(Integer loyaltyPoints);
}