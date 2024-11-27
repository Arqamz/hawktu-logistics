package com.hawktu.server.services;

import com.hawktu.server.dtos.request.SellerRegisterRequest;
import com.hawktu.server.factories.SellerFactory;
import com.hawktu.server.models.Seller;
import com.hawktu.server.repositories.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SellerService {

    private final SellerRepository sellerRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private SellerFactory sellerFactory;

    @Autowired
    public SellerService(SellerRepository sellerRepository, BCryptPasswordEncoder passwordEncoder) {
        this.sellerRepository = sellerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    
    public boolean authenticate(String email, String password) {
        // Find the seller by email
        Optional<Seller> sellerOptional = sellerRepository.findByEmail(email);
        
        // If seller exists, check the password
        return sellerOptional.map(seller -> 
            passwordEncoder.matches(password, seller.getPassword())
        ).orElse(false);
    }

    // Additional methods can be added as needed
    public Optional<Seller> findByEmail(String email) {
        return sellerRepository.findByEmail(email);
    }

    public boolean register(SellerRegisterRequest user) {
        Optional<Seller> existingSeller = sellerRepository.findByEmail(user.getEmail());
        if (existingSeller.isPresent()) {
            return false;
        }

        // Encrypt the password and save the seller
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Seller seller = sellerFactory.createDefaultSeller(user.getEmail(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getPhoneNumber(), user.getBusinessName());
        sellerRepository.save(seller);
        return true;
    }

    
}