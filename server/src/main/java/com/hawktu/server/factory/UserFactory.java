package com.hawktu.server.factory;

import com.hawktu.server.builder.UserBuilder;
import com.hawktu.server.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserFactory {
    static public User createUser(
        String username, 
        String password, 
        String email, 
        String firstName, 
        String lastName, 
        String phoneNumber
    ) {
        return new UserBuilder()
            .username(username)
            .password(password)
            .email(email)
            .firstName(firstName)
            .lastName(lastName)
            .phoneNumber(phoneNumber)
            .walletBalance(0.0)
            .loyaltyPoints(0)
            .build();
    }

}