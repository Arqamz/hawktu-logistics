package com.hawktu.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hawktu.server.models.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    // Find a customer by email
    Optional<Customer> findByEmail(String email);

    // Check if a customer exists with a given email
    boolean existsByEmail(String email);

    // Optional: Find customers by first name or last name
    Optional<Customer> findByFirstName(String firstName);
    Optional<Customer> findByLastName(String lastName);
}