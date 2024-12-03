package com.hawktu.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hawktu.server.dtos.response.OrderCountResponse;
import com.hawktu.server.dtos.response.OrdersResponse;
import com.hawktu.server.dtos.response.ProductCountResponse;
import com.hawktu.server.dtos.response.RevenueSummaryResponse;
import com.hawktu.server.dtos.response.ReviewsResponse;
import com.hawktu.server.dtos.response.WalletBalanceResponse;
import com.hawktu.server.services.SellerService;
import com.hawktu.server.utils.JwtUtil;

@RestController
@RequestMapping("/seller")
public class SellerDashboardController extends BaseController {

    private final SellerService sellerService;
    private final JwtUtil jwtUtil;

    @Autowired
    public SellerDashboardController(SellerService sellerService, JwtUtil jwtUtil) {
        this.sellerService = sellerService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/wallet-balance")
    public ResponseEntity<?> getWalletBalance(@RequestHeader("Authorization") String authHeader) {
        try {
            String email = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
            if (!jwtUtil.validateToken(authHeader, email)) {
                return unauthorizedError("Invalid or expired token.");
            }
            WalletBalanceResponse response = sellerService.getWalletBalance(email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return internalServerError("Couldn't get wallet balance");
        }
    }

    @GetMapping("/revenue")
    public ResponseEntity<?> getRevenueSummary(@RequestHeader("Authorization") String authHeader) {
        try {
            String email = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
            if (!jwtUtil.validateToken(authHeader, email)) {
                return unauthorizedError("Invalid or expired token.");
            }
            RevenueSummaryResponse response = sellerService.getRevenueSummary(email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return internalServerError("Couldn't get revenue summary");
        }
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders(@RequestHeader("Authorization") String authHeader) {
        try {
            String email = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
            if (!jwtUtil.validateToken(authHeader, email)) {
                return unauthorizedError("Invalid or expired token.");
            }
            OrdersResponse response = sellerService.getAllOrders(email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return internalServerError("Couldn't get all orders");
        }
    }

    @GetMapping("/orders/count")
    public ResponseEntity<?> getOrderCounts(@RequestHeader("Authorization") String authHeader) {
        try {
            String email = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
            if (!jwtUtil.validateToken(authHeader, email)) {
                return unauthorizedError("Invalid or expired token.");
            }
            OrderCountResponse response = sellerService.getOrderCounts(email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return internalServerError("Couldn't g  et order counts");
        }
    }

    @GetMapping("/orders/recent")
    public ResponseEntity<?> getRecentOrders(@RequestHeader("Authorization") String authHeader) {
        try {
            String email = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
            if (!jwtUtil.validateToken(authHeader, email)) {
                return unauthorizedError("Invalid or expired token.");
            }
            OrdersResponse response = sellerService.getRecentOrders(email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return internalServerError("Couldn't get recent orders");
        }
    }

    @GetMapping("/products/count")
    public ResponseEntity<?> getActiveProducts(@RequestHeader("Authorization") String authHeader) {
        try {
            String email = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
            if (!jwtUtil.validateToken(authHeader, email)) {
                return unauthorizedError("Invalid or expired token.");
            }
            ProductCountResponse response = sellerService.getActiveProducts(email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return internalServerError("Couldn't get active products");
        }
    }

    @GetMapping("/products/reviews")
    public ResponseEntity<?> getProductReviews(@RequestHeader("Authorization") String authHeader, @RequestParam Long productId) {
        try {
            String email = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
            if (!jwtUtil.validateToken(authHeader, email)) {
                return unauthorizedError("Invalid or expired token.");
            }
            ReviewsResponse response = sellerService.getProductReviews(email, productId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return internalServerError("Couldn't get product reviews");
        }
    }

}
