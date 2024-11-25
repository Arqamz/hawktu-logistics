package com.hawktu.server.interfaces;

import java.time.LocalDateTime;

public interface IUser {

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