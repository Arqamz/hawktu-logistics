package com.hawktu.server.builders;

import java.time.LocalDateTime;

import com.hawktu.server.models.Address;
import com.hawktu.server.models.User;

public abstract class UserBuilder<T extends User, B extends UserBuilder<T, B>> {
    protected String password;
    protected String email;
    protected String firstName;
    protected String lastName;
    protected String phoneNumber;
    protected LocalDateTime registeredAt;
    protected Address address;
    protected Double wallet = 0.0;

    // Use generics to enable method chaining for subclasses
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

    public B registeredAt(LocalDateTime registeredAt) {
        this.registeredAt = registeredAt;
        return self();
    }

    public B address(Address address) {
        this.address = address;
        return self();
    }

    public B wallet(Double wallet) {
        this.wallet = wallet;
        return self();
    }

    public abstract T build();
}