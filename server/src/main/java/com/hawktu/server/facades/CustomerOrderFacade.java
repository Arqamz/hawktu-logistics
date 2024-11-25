package com.hawktu.server.facades;

import com.hawktu.server.models.Order;
import com.hawktu.server.models.OrderItem;
import com.hawktu.server.repositories.GlobalOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CustomerOrderFacade {

    private final GlobalOrderRepository globalOrderRepository;
    private final Map<Long, List<Order>> customerOrdersCache = new HashMap<>();

    @Autowired
    public CustomerOrderFacade(GlobalOrderRepository globalOrderRepository) {
        this.globalOrderRepository = globalOrderRepository;
    }

    public List<Order> getOrdersForCustomer(Long customerId) {
        if (!customerOrdersCache.containsKey(customerId)) {
            List<Order> orders = globalOrderRepository.findByCustomerId(customerId);
            customerOrdersCache.put(customerId, orders);
        }
        return customerOrdersCache.get(customerId);
    }

    public void requestRefund(Long customerId, Long orderId, Long orderItemId) {
        Order order = globalOrderRepository.findById(orderId).orElseThrow(() -> new IllegalArgumentException("Order not found"));
        if (order.getCustomerId().equals(customerId)) {
            for (OrderItem item : order.getOrderItems()) {
                if (item.getId().equals(orderItemId)) {
                    try {
                        item.refund();
                        globalOrderRepository.save(order);
                        return;
                    } catch (IllegalStateException e) {
                        throw new IllegalArgumentException("Refund cannot be requested for this item: " + e.getMessage());
                    }
                }
            }
            throw new IllegalArgumentException("Order item not found.");
        } else {
            throw new IllegalArgumentException("Customer does not own this order.");
        }
    }

    public void saveOrderChanges(Long customerId) {
        if (customerOrdersCache.containsKey(customerId)) {
            List<Order> orders = customerOrdersCache.get(customerId);
            orders.forEach(globalOrderRepository::save);
            customerOrdersCache.remove(customerId);
        }
    }
}
