package com.hawktu.server.services;

import com.hawktu.server.dtos.request.SellerRegisterRequest;
import com.hawktu.server.factories.SellerFactory;
import com.hawktu.server.models.Seller;
import com.hawktu.server.repositories.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Service
public class SellerService {

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private SellerFactory sellerFactory;

    @Autowired
    public SellerService(SellerRepository sellerRepository, PasswordEncoder passwordEncoder) {
        this.sellerRepository = sellerRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    private final SellerRepository sellerRepository;
    
    public boolean authenticate(String email, String password) {
        Optional<Seller> sellerOptional = sellerRepository.findByEmail(email);
        
        return sellerOptional.map(seller -> 
            passwordEncoder.matches(password, seller.getPassword())
        ).orElse(false);
    }

    public Optional<Seller> findByEmail(String email) {
        return sellerRepository.findByEmail(email);
    }

    public boolean register(SellerRegisterRequest user) {
        Optional<Seller> existingSeller = sellerRepository.findByEmail(user.getEmail());
        if (existingSeller.isPresent()) {
            return false;
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Seller seller = sellerFactory.createSeller(user.getEmail(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getPhoneNumber(), user.getBusinessName(),user.getAddress());
        sellerRepository.save(seller);
        return true;
    }

    
}