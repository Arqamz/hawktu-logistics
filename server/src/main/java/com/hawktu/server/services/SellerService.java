package com.hawktu.server.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hawktu.server.dtos.request.ChangePasswordRequest;
import com.hawktu.server.dtos.request.SellerRegisterRequest;
import com.hawktu.server.dtos.request.UpdateSellerInfoRequest;
import com.hawktu.server.dtos.response.SellerInfoResponse;
import com.hawktu.server.factories.SellerFactory;
import com.hawktu.server.models.Seller;
import com.hawktu.server.repositories.SellerRepository;

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

    public SellerInfoResponse getSellerInfo(String email) {
        Seller seller = sellerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Seller not found."));
        
        return new SellerInfoResponse(
                seller.getFirstName(),
                seller.getLastName(),
                seller.getPhoneNumber(),
                seller.getAddress(),
                seller.getBusinessName()
        );
    }

    public void updateSellerInfo(String email, UpdateSellerInfoRequest request) {
        Seller seller = sellerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Seller not found."));

        seller.setFirstName(request.getFirstName());
        seller.setLastName(request.getLastName());
        seller.setPhoneNumber(request.getPhoneNumber());
        seller.setAddress(request.getAddress());
        seller.setBusinessName(request.getBusinessName());
        sellerRepository.save(seller);
    }

    public boolean changePassword(String email, ChangePasswordRequest request) {
        Seller seller = sellerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Seller not found."));

        if (!passwordEncoder.matches(request.getCurrentPassword(), seller.getPassword())) {
            return false;
        }

        seller.setPassword(passwordEncoder.encode(request.getNewPassword()));
        sellerRepository.save(seller);
        return true;
    }    
}