package com.hawktu.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hawktu.server.services.SellerService;
import com.hawktu.server.utils.JwtUtil;

@RestController
@RequestMapping("/seller")
public class SellerDashboardController extends BaseController {

    private final SellerService sellerDashboardService;
    private final JwtUtil jwtUtil;

    @Autowired
    public SellerDashboardController(SellerService sellerDashboardService, JwtUtil jwtUtil) {
        this.sellerDashboardService = sellerDashboardService;
        this.jwtUtil = jwtUtil;
    }

    // @GetMapping("/wallet-balance")
    // public ResponseEntity<WalletBalanceResponse> getWalletBalance(@RequestHeader("Authorization") String authHeader) {
    //     try {
    //         String email = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
    //         if (!jwtUtil.validateToken(authHeader, email)) {
    //             return unauthorizedError("Invalid or expired token.");
    //         }
    //         WalletBalanceResponse response = sellerDashboardService.getWalletBalance(email);
    //         return ResponseEntity.ok(response);
    //     } catch (Exception e) {
    //         return internalServerError("Couldn't get wallet balance");
    //     }
    // }

    // @GetMapping("/revenue")
    // public ResponseEntity<RevenueSummaryResponse> getRevenueSummary(@RequestHeader("Authorization") String authHeader) {
    //     try {
    //         String email = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
    //         if (!jwtUtil.validateToken(authHeader, email)) {
    //             return unauthorizedError("Invalid or expired token.");
    //         }
    //         RevenueSummaryResponse response = sellerDashboardService.getRevenueSummary(email);
    //         return ResponseEntity.ok(response);
    //     } catch (Exception e) {
    //         return internalServerError("Couldn't get revenue summary");
    //     }
    // }

    // @GetMapping("/orders/count")
    // public ResponseEntity<OrderCountResponse> getOrderCounts(@RequestHeader("Authorization") String authHeader) {
    //     try {
    //         String email = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
    //         if (!jwtUtil.validateToken(authHeader, email)) {
    //             return unauthorizedError("Invalid or expired token.");
    //         }
    //         OrderCountResponse response = sellerDashboardService.getOrderCounts(email);
    //         return ResponseEntity.ok(response);
    //     } catch (Exception e) {
    //         return internalServerError("Couldn't get order counts");
    //     }
    // }

    // @GetMapping("/products/active")
    // public ResponseEntity<ActiveProductsResponse> getActiveProducts(@RequestHeader("Authorization") String authHeader) {
    //     try {
    //         String email = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
    //         if (!jwtUtil.validateToken(authHeader, email)) {
    //             return unauthorizedError("Invalid or expired token.");
    //         }
    //         ActiveProductsResponse response = sellerDashboardService.getActiveProducts(email);
    //         return ResponseEntity.ok(response);
    //     } catch (Exception e) {
    //         return internalServerError("Couldn't get active products");
    //     }
    // }

    // @GetMapping("/orders")
    // public ResponseEntity<AllOrdersResponse> getAllOrders(@RequestHeader("Authorization") String authHeader) {
    //     try {
    //         String email = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
    //         if (!jwtUtil.validateToken(authHeader, email)) {
    //             return unauthorizedError("Invalid or expired token.");
    //         }
    //         AllOrdersResponse response = sellerDashboardService.getAllOrders(email);
    //         return ResponseEntity.ok(response);
    //     } catch (Exception e) {
    //         return internalServerError("Couldn't get all orders");
    //     }
    // }

    // @GetMapping("/orders/recent")
    // public ResponseEntity<RecentOrdersResponse> getRecentOrders(@RequestHeader("Authorization") String authHeader) {
    //     try {
    //         String email = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
    //         if (!jwtUtil.validateToken(authHeader, email)) {
    //             return unauthorizedError("Invalid or expired token.");
    //         }
    //         RecentOrdersResponse response = sellerDashboardService.getRecentOrders(email);
    //         return ResponseEntity.ok(response);
    //     } catch (Exception e) {
    //         return internalServerError("Couldn't get recent orders");
    //     }
    // }

    // @GetMapping("/reviews")
    // public ResponseEntity<ProductReviewsResponse> getProductReviews(@RequestHeader("Authorization") String authHeader) {
    //     try {
    //         String email = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
    //         if (!jwtUtil.validateToken(authHeader, email)) {
    //             return unauthorizedError("Invalid or expired token.");
    //         }
    //         ProductReviewsResponse response = sellerDashboardService.getProductReviews(email);
    //         return ResponseEntity.ok(response);
    //     } catch (Exception e) {
    //         return internalServerError("Couldn't get product reviews");
    //     }
    // }
}
