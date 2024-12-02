package com.hawktu.server.controllers;

import com.hawktu.server.dtos.request.CartDTO;
import com.hawktu.server.models.Order;
import com.hawktu.server.services.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    
    private final ShopService shopService;

    @Autowired
    public OrderController(ShopService shopService) {
        this.shopService = shopService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody CartDTO cartDTO) {
        try {
            Order order = shopService.placeOrder(cartDTO);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An error occurred while processing the order");
        }
    }
}