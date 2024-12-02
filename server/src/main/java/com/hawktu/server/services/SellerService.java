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
import com.hawktu.server.repositories.OrderItemRepository;
import com.hawktu.server.repositories.ProductRepository;
import com.hawktu.server.repositories.ReviewRepository;
import com.hawktu.server.repositories.SellerRepository;


@Service
public class SellerService {

    @Autowired
    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    private SellerFactory sellerFactory;
    
    @Autowired
    private final SellerRepository sellerRepository;

    @Autowired
    private final ProductRepository productRepository;
    
    @Autowired
    private final OrderItemRepository orderItemRepository;
    
    @Autowired
    private final ReviewRepository reviewRepository;

    @Autowired
    public SellerService(PasswordEncoder passwordEncoder, SellerRepository sellerRepository, ProductRepository productRepository, OrderItemRepository orderItemRepository, ReviewRepository reviewRepository) {
        this.passwordEncoder = passwordEncoder;
        this.sellerRepository = sellerRepository;
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
        this.reviewRepository = reviewRepository;
    }

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

    // public WalletBalanceResponse getWalletBalance(String email) {
    //     BigDecimal walletBalance = orderItemRepository.calculateWalletBalanceBySeller(email);
    //     return new WalletBalanceResponse(walletBalance);
    // }

    // public RevenueSummaryResponse getRevenueSummary(String email) {
    //     BigDecimal thisMonthRevenue = orderItemRepository.calculateMonthlyRevenueBySeller(email, "current");
    //     BigDecimal lastMonthRevenue = orderItemRepository.calculateMonthlyRevenueBySeller(email, "last");
    //     return new RevenueSummaryResponse(thisMonthRevenue, lastMonthRevenue);
    // }

    // public OrderCountResponse getOrderCounts(String email) {
    //     int thisMonthOrders = orderItemRepository.countOrdersBySeller(email, "current");
    //     int lastMonthOrders = orderItemRepository.countOrdersBySeller(email, "last");
    //     return new OrderCountResponse(thisMonthOrders, lastMonthOrders);
    // }

    // public ActiveProductsResponse getActiveProducts(String email) {
    //     List<Product> activeProducts = productRepository.findActiveProductsBySeller(email);
    //     return new ActiveProductsResponse(activeProducts);
    // }

    // public AllOrdersResponse getAllOrders(String email) {
    //     List<OrderItem> orders = orderItemRepository.findAllBySeller(email);
    //     return new AllOrdersResponse(orders);
    // }

    // public RecentOrdersResponse getRecentOrders(String email) {
    //     List<OrderItem> recentOrders = orderItemRepository.findRecentOrdersBySeller(email, 5);
    //     return new RecentOrdersResponse(recentOrders);
    // }

    // public ProductReviewsResponse getProductReviews(String email) {
    //     List<Review> reviews = reviewRepository.findReviewsForSellerProducts(email);
    //     return new ProductReviewsResponse(reviews);
    // }
}