package com.hawktu.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
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
             String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);

            if (!jwtUtil.validateToken(token, email)) {
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
             String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);

            if (!jwtUtil.validateToken(token, email)) {
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
             String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);

            if (!jwtUtil.validateToken(token, email)) {
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
             String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);

            if (!jwtUtil.validateToken(token, email)) {
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
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);

            if (!jwtUtil.validateToken(token, email)) {
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
             String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);

            if (!jwtUtil.validateToken(token, email)) {
                return unauthorizedError("Invalid or expired token.");
            }
            ProductCountResponse response = sellerService.getActiveProducts(email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return internalServerError("Couldn't get active products");
        }
    }

    @GetMapping("/reviews")
    public ResponseEntity<?> getSellerProductReviews(@RequestHeader("Authorization") String authHeader) {
        try {
             String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);

            if (!jwtUtil.validateToken(token, email)) {
                return unauthorizedError("Invalid or expired token.");
            }
            ReviewsResponse reviewResponse = sellerService.getReviewsForSellerProducts(email);
            return ResponseEntity.ok(reviewResponse);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Couldn't fetch reviews.");
        }
    }
}
