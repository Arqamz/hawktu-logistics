package com.hawktu.server.dtos.response;

import com.hawktu.server.models.Address;

public class CustomerInfoResponse {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Address address;
    private double wallet;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Address getAddress() {
        return address;
    }

    public void setWallet(double wallet) {
        this.wallet = wallet;
    }
    public double getWallet() {
        return wallet;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public CustomerInfoResponse(String firstName, String lastName, String phoneNumber, Address address,double wallet) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.wallet=wallet;
    }
}