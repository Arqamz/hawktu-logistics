package com.hawktu.server.controllers;

import com.fasterxml.jackson.databind.JsonSerializable.Base;
import com.hawktu.server.dtos.request.CartDTO;
import com.hawktu.server.models.Order;
import com.hawktu.server.models.OrderItem;
import com.hawktu.server.services.ShopService;
import com.hawktu.server.dtos.response.OrderStatusDTO;
import com.hawktu.server.repositories.OrderItemRepository;
import com.hawktu.server.dtos.response.OrderItemStatusDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.stream.Collectors;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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