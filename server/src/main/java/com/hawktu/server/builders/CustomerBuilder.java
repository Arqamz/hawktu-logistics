package com.hawktu.server.builders;

import com.hawktu.server.models.Customer;

public class CustomerBuilder extends UserBuilder<Customer, CustomerBuilder> {

    @Override
    public Customer build() {
        validateCustomer();
        Customer customer = new Customer();
        customer.setPassword(password);
        customer.setEmail(email);
        customer.setFirstName(firstName);
        customer.setLastName(lastName);
        customer.setPhoneNumber(phoneNumber);
        customer.setAddress(address);
        return customer;
    }

    private void validateCustomer() {
        super.validateUser();
    }

}
