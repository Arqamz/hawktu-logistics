package com.hawktu.server.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.hawktu.server.interfaces.IUser;

@Entity
@Table(name = "users")
public class User implements IUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private LocalDateTime registeredAt;

    @Column(nullable = false)
    private Double walletBalance = 0.0;

    @Column(nullable = false)
    private Integer loyaltyPoints = 0;

    // No-args constructor
    public User() {
        this.registeredAt = LocalDateTime.now();
    }

    // Full constructor
    public User(Long id, String username, String password, String email, 
                String firstName, String lastName, String phoneNumber, 
                LocalDateTime registeredAt, Double walletBalance, Integer loyaltyPoints) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.registeredAt = registeredAt != null ? registeredAt : LocalDateTime.now();
        this.walletBalance = walletBalance != null ? walletBalance : 0.0;
        this.loyaltyPoints = loyaltyPoints != null ? loyaltyPoints : 0;
    }

    // Implementing IUser interface methods


    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getFirstName() {
        return firstName;
    }

    @Override
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Override
    public String getLastName() {
        return lastName;
    }

    @Override
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String getPhoneNumber() {
        return phoneNumber;
    }

    @Override
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public LocalDateTime getRegisteredAt() {
        return registeredAt;
    }

    @Override
    public void setRegisteredAt(LocalDateTime registeredAt) {
        this.registeredAt = registeredAt;
    }

    @Override
    public Double getWalletBalance() {
        return walletBalance;
    }

    @Override
    public void setWalletBalance(Double walletBalance) {
        this.walletBalance = walletBalance;
    }

    @Override
    public Integer getLoyaltyPoints() {
        return loyaltyPoints;
    }

    @Override
    public void setLoyaltyPoints(Integer loyaltyPoints) {
        this.loyaltyPoints = loyaltyPoints;
    }

    // Equals, HashCode, and ToString methods
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        User user = (User) o;
        
        if (id != null ? !id.equals(user.id) : user.id != null) return false;
        return username != null ? username.equals(user.username) : user.username == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (username != null ? username.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", registeredAt=" + registeredAt +
                '}';
    }
}



