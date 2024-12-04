package com.hawktu.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hawktu.server.dtos.request.ChangePasswordRequest;
import com.hawktu.server.dtos.request.UpdateSellerInfoRequest;
import com.hawktu.server.dtos.response.SellerInfoResponse;
import com.hawktu.server.services.SellerService;
import com.hawktu.server.utils.JwtUtil;

@RestController
@RequestMapping("/seller")
public class SellerInfoController extends BaseController {

    private final SellerService sellerService;
    private final JwtUtil jwtUtil;

    @Autowired
    public SellerInfoController(SellerService sellerService, JwtUtil jwtUtil) {
        this.sellerService = sellerService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/info")
    public ResponseEntity<?> getSellerInfo(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);

            if (!jwtUtil.validateToken(token, email)) {
                return unauthorizedError("Invalid or expired token.");
            }

            SellerInfoResponse response = sellerService.getSellerInfo(email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return internalServerError("Error fetching seller info: " + e.getMessage());
        }
    }

    @PutMapping("/update-info")
    public ResponseEntity<?> updateSellerInfo(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody UpdateSellerInfoRequest request
    ) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);

            if (!jwtUtil.validateToken(token, email)) {
                return unauthorizedError("Invalid or expired token.");
            }

            sellerService.updateSellerInfo(email, request);
            return ResponseEntity.ok("Seller info updated successfully.");
        } catch (Exception e) {
            logger.error("Error updating seller info: ", e);
            return internalServerError("Error updating seller info: " + e.getMessage());
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ChangePasswordRequest request
    ) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);

            if (!jwtUtil.validateToken(token, email)) {
                return unauthorizedError("Invalid or expired token.");
            }

            boolean passwordChanged = sellerService.changePassword(email, request);
            if (passwordChanged) {
                return ResponseEntity.ok("Password changed successfully.");
            } else {
                return badRequestError("Current password is incorrect.");
            }
        } catch (Exception e) {
            logger.error("Error changing password: ", e);
            return internalServerError("Error changing password: " + e.getMessage());
        }
    }


}
