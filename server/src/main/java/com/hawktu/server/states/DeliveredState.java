package com.hawktu.server.states;

public class DeliveredState implements OrderItemState {
    @Override
    public OrderItemState nextState() {
        throw new IllegalStateException("Order is already delivered.");
    }

    @Override
    public OrderItemState cancel() {
        throw new IllegalStateException("Cannot cancel a delivered order.");
    }

    @Override
    public OrderItemState refund() {
        return new RefundRequestedState();
    }

    @Override
    public OrderItemState approveRefund() {
        throw new IllegalStateException("Cannot approve refund directly in Delivered state.");
    }

    @Override
    public OrderItemState denyRefund() {
        throw new IllegalStateException("Cannot deny refund in Delivered state.");
    }
}
