package com.hawktu.server.builders;

import com.hawktu.server.models.Address;
import com.hawktu.server.models.User;

public abstract class UserBuilder<T extends User, B extends UserBuilder<T, B>> {
    protected String password;
    protected String email;
    protected String firstName;
    protected String lastName;
    protected String phoneNumber;
    protected Address address;

    // Using generics to enable method chaining for subclasses
    @SuppressWarnings("unchecked")
    protected B self() {
        return (B) this;
    }

    public B password(String password) {
        this.password = password;
        return self();
    }

    public B email(String email) {
        this.email = email;
        return self();
    }

    public B firstName(String firstName) {
        this.firstName = firstName;
        return self();
    }

    public B lastName(String lastName) {
        this.lastName = lastName;
        return self();
    }

    public B phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return self();
    }

    public B address(Address address) {
        this.address = address;
        return self();
    }

    public abstract T build();
    
    protected void validateUser() {
        if (password == null || password.isEmpty()) {
            throw new IllegalStateException("Password is required");
        }

        if (email == null || email.isEmpty()) {
            throw new IllegalStateException("Email is required");
        }

        if (firstName == null || firstName.isEmpty()) {
            throw new IllegalStateException("First name is required");
        }

        if (lastName == null || lastName.isEmpty()) {
            throw new IllegalStateException("Last name is required");
        }

        if (phoneNumber == null || phoneNumber.isEmpty()) {
            throw new IllegalStateException("Phone number is required");
        }

        if (address == null) {
            throw new IllegalStateException("Address is required");
        }
    }

}