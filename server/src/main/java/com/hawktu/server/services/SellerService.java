package com.hawktu.server.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hawktu.server.dtos.request.ChangePasswordRequest;
import com.hawktu.server.dtos.request.SellerRegisterRequest;
import com.hawktu.server.dtos.request.UpdateSellerInfoRequest;
import com.hawktu.server.dtos.response.OrderCountResponse;
import com.hawktu.server.dtos.response.OrderItemPayload;
import com.hawktu.server.dtos.response.OrdersResponse;
import com.hawktu.server.dtos.response.ProductCountResponse;
import com.hawktu.server.dtos.response.RevenueSummaryResponse;
import com.hawktu.server.dtos.response.ReviewsResponse;
import com.hawktu.server.dtos.response.SellerInfoResponse;
import com.hawktu.server.dtos.response.WalletBalanceResponse;
import com.hawktu.server.factories.SellerFactory;
import com.hawktu.server.models.OrderItem;
import com.hawktu.server.models.Product;
import com.hawktu.server.models.Review;
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
    private ProductService productService;

    @Autowired
    public SellerService(PasswordEncoder passwordEncoder, SellerRepository sellerRepository, ProductRepository productRepository, OrderItemRepository orderItemRepository, ReviewRepository reviewRepository, ProductService productService) {
        this.passwordEncoder = passwordEncoder;
        this.sellerRepository = sellerRepository;
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
        this.reviewRepository = reviewRepository;
        this.productService = productService;
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

    public WalletBalanceResponse getWalletBalance(String email) {
        // TODO: Check for email existence in DB, then fetch wallet balance, else throw error
        BigDecimal walletBalance = sellerRepository.findWalletBalanceByEmail(email);
        return new WalletBalanceResponse(walletBalance);
    }
    
    public RevenueSummaryResponse getRevenueSummary(String email) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfThisMonth = now.with(TemporalAdjusters.firstDayOfMonth()).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime startOfLastMonth = startOfThisMonth.minusMonths(1);
        LocalDateTime endOfLastMonth = startOfThisMonth.minusSeconds(1);

        BigDecimal totalRevenue = orderItemRepository.calculateRevenueBySellerAndDateRange(email, null, null);
        BigDecimal thisMonthRevenue = orderItemRepository.calculateRevenueBySellerAndDateRange(email, startOfThisMonth, now);
        BigDecimal lastMonthRevenue = orderItemRepository.calculateRevenueBySellerAndDateRange(email, startOfLastMonth, endOfLastMonth);

        return new RevenueSummaryResponse(totalRevenue, thisMonthRevenue, lastMonthRevenue);
    }

    public OrdersResponse getAllOrders(String email) {
        List<OrderItem> orders = orderItemRepository.findOrdersBySellerAndDateRange(email, null, null);

        List<OrderItemPayload> orderItemPayloads = new ArrayList<>();

        for (OrderItem orderItem : orders) {
            OrderItemPayload payload = new OrderItemPayload(
                orderItem.getId(),
                "John Doe",
                orderItem.getOrderId(),
                orderItem.getProductId(),
                orderItem.getQuantity(),
                orderItem.getTotalPrice(),
                orderItem.getDeliveryAddress(),
                orderItem.getState(),
                orderItem.getRefundMessage(),
                orderItem.getRefundResponse()
            );
            orderItemPayloads.add(payload);
        }
        return new OrdersResponse(orderItemPayloads);
    }
    
    public OrdersResponse getRecentOrders(String email) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfThisMonth = now.with(TemporalAdjusters.firstDayOfMonth()).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfThisMonth = now.with(TemporalAdjusters.lastDayOfMonth()).withHour(23).withMinute(59).withSecond(59);

        List<OrderItem> recentOrders = orderItemRepository.findOrdersBySellerAndDateRange(email, startOfThisMonth, endOfThisMonth);

        List<OrderItemPayload> orderItemPayloads = new ArrayList<>();

        for (OrderItem orderItem : recentOrders) {
            OrderItemPayload payload = new OrderItemPayload(
                orderItem.getId(),
                "John Doe",
                orderItem.getOrderId(),
                orderItem.getProductId(),
                orderItem.getQuantity(),
                orderItem.getTotalPrice(),
                orderItem.getDeliveryAddress(),
                orderItem.getState(),
                orderItem.getRefundMessage(),
                orderItem.getRefundResponse()
            );
            orderItemPayloads.add(payload);
        }

        return new OrdersResponse(orderItemPayloads);
    }

    public OrderCountResponse getOrderCounts(String email) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfThisMonth = now.with(TemporalAdjusters.firstDayOfMonth()).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime startOfLastMonth = startOfThisMonth.minusMonths(1);
        LocalDateTime endOfLastMonth = startOfThisMonth.minusSeconds(1);

        Long totalOrders = orderItemRepository.countOrdersBySellerAndDateRange(email, null, null);
        Long thisMonthOrders = orderItemRepository.countOrdersBySellerAndDateRange(email, startOfThisMonth, now);
        Long lastMonthOrders = orderItemRepository.countOrdersBySellerAndDateRange(email, startOfLastMonth, endOfLastMonth);

        return new OrderCountResponse(totalOrders, thisMonthOrders, lastMonthOrders);
    }

    public ProductCountResponse getActiveProducts(String email) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfThisMonth = now.with(TemporalAdjusters.firstDayOfMonth()).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime startOfLastMonth = startOfThisMonth.minusMonths(1);
        LocalDateTime endOfLastMonth = startOfThisMonth.minusSeconds(1);

        Long totalProducts = productRepository.countActiveProductsBySellerEmailAndDateRange(email, null, null);
        Long thisMonthProducts = productRepository.countActiveProductsBySellerEmailAndDateRange(email, startOfThisMonth, now);
        Long lastMonthProducts = productRepository.countActiveProductsBySellerEmailAndDateRange(email, startOfLastMonth, endOfLastMonth);
        return new ProductCountResponse(totalProducts, thisMonthProducts, lastMonthProducts);
    }


    public ReviewsResponse getProductReviews(String email, Long productId) {
        Seller seller = sellerRepository.findByEmail(email)
            .orElseThrow(() -> new IllegalArgumentException("Seller not found"));

        Long sellerId = seller.getId();
        Product product = productService.getProductById(productId);

        if (!product.getSellerId().equals(sellerId)) {
            throw new IllegalArgumentException("Product does not belong to the seller");
        }

        List<Review> reviews = reviewRepository.findAllByProductId(productId);
        ReviewsResponse response = new ReviewsResponse(reviews);

        return response;
    }

}