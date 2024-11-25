package com.hawktu.server.facades;

import com.hawktu.server.models.Order;
import com.hawktu.server.models.OrderItem;
import com.hawktu.server.repositories.GlobalOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class SellerOrderFacade {

    private final GlobalOrderRepository globalOrderRepository;
    private final Map<Long, List<OrderItem>> sellerOrdersCache = new HashMap<>();

    @Autowired
    public SellerOrderFacade(GlobalOrderRepository globalOrderRepository) {
        this.globalOrderRepository = globalOrderRepository;
    }

    public List<OrderItem> getOrdersForSeller(Long sellerId) {
        if (!sellerOrdersCache.containsKey(sellerId)) {
            List<Order> orders = globalOrderRepository.findByOrderItemsSellerId(sellerId);
            List<OrderItem> items = orders.stream()
                    .flatMap(order -> order.getOrderItems().stream())
                    .filter(item -> item.getSeller().getId().equals(sellerId))
                    .collect(Collectors.toList());
            sellerOrdersCache.put(sellerId, items);
        }
        return sellerOrdersCache.get(sellerId);
    }
    
    public void approveRefund(Long sellerId, Long orderItemId) {
        OrderItem item = globalOrderRepository.findOrderItemByIdAndSellerId(orderItemId, sellerId);
        if (item == null) {
            throw new IllegalArgumentException("Refund request not found or not accessible by this seller.");
        }
        item.approveRefund();
        globalOrderRepository.save(item.getOrder());
    }
    
    public void denyRefund(Long sellerId, Long orderItemId) {
        OrderItem item = globalOrderRepository.findOrderItemByIdAndSellerId(orderItemId, sellerId);
        if (item == null) {
            throw new IllegalArgumentException("Refund request not found or not accessible by this seller.");
        }
        item.denyRefund();
        globalOrderRepository.save(item.getOrder());
    }
    
    public void saveOrderChanges(Long sellerId) {
        if (sellerOrdersCache.containsKey(sellerId)) {
            List<OrderItem> items = sellerOrdersCache.get(sellerId);
            for (OrderItem item : items) {
                globalOrderRepository.save(item.getOrder());
            }
            sellerOrdersCache.remove(sellerId);
        }
    }    
}
