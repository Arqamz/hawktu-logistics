package com.hawktu.server.states;

public class ShippedState implements OrderItemState {
    @Override
    public OrderItemState nextState() {
        return new DeliveredState();
    }

    @Override
    public OrderItemState cancel() {
        throw new IllegalStateException("Cannot cancel a shipped order.");
    }

    @Override
    public OrderItemState refund() {
        return new RefundRequestedState();
    }

    @Override
    public OrderItemState approveRefund() {
        throw new IllegalStateException("Cannot approve refund from Shipped state.");
    }

    @Override
    public OrderItemState denyRefund() {
        throw new IllegalStateException("Cannot deny refund from Shipped state.");
    }
}
