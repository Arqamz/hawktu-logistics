package com.hawktu.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hawktu.server.dtos.request.CartDTO;
import com.hawktu.server.dtos.response.OrderStatusDTO;
import com.hawktu.server.models.Order;
import com.hawktu.server.services.ShopService;

@RestController
@RequestMapping("/orders")
public class OrderController extends BaseController {
    
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

    @GetMapping("/status")
    public ResponseEntity<?> getOrderStatus(@RequestParam Long orderId) {
        try {
            OrderStatusDTO orderStatus = shopService.findOrderStatus(orderId);
            return ResponseEntity.ok(orderStatus);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}