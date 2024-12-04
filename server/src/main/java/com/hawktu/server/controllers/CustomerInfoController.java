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
import com.hawktu.server.dtos.request.UpdateCustomerInfoRequest;
import com.hawktu.server.dtos.response.CustomerInfoResponse;
import com.hawktu.server.services.CustomerService;
import com.hawktu.server.utils.JwtUtil;

@RestController
@RequestMapping("/customer")
public class CustomerInfoController extends BaseController {

    private final CustomerService customerService;
    private final JwtUtil jwtUtil;

    @Autowired
    public CustomerInfoController(CustomerService customerService, JwtUtil jwtUtil) {
        this.customerService = customerService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/info")
    public ResponseEntity<?> getCustomerInfo(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);

            if (!jwtUtil.validateToken(token, email)) {
                return unauthorizedError("Invalid or expired token.");
            }

            CustomerInfoResponse response = customerService.getCustomerInfo(email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return internalServerError("Couldn't get customer info");
        }
    }
    
    @PutMapping("/update-info")
    public ResponseEntity<?> updateCustomerInfo(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody UpdateCustomerInfoRequest request
    ) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);

            if (!jwtUtil.validateToken(token, email)) {
                return unauthorizedError("Invalid or expired token.");
            }

            customerService.updateCustomerInfo(email, request);
            return ResponseEntity.ok("Customer info updated successfully.");
        } catch (Exception e) {
            logger.error("Error updating customer info: ", e);
            return internalServerError("Error updating customer info: " + e.getMessage());
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

            boolean passwordChanged = customerService.changePassword(email, request);
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
