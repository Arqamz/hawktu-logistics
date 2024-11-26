package com.hawktu.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hawktu.server.models.Seller;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
    // Find a seller by email
    Optional<Seller> findByEmail(String email);

    // Check if a seller exists with a given email
    boolean existsByEmail(String email);

    // Find sellers by business name
    Optional<Seller> findByBusinessName(String businessName);

    // Find sellers by first name or last name
    Optional<Seller> findByFirstName(String firstName);
    Optional<Seller> findByLastName(String lastName);
}