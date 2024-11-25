package com.hawktu.server.states;

public class ProcessingState implements OrderItemState {
    @Override
    public OrderItemState nextState() {
        return new ShippedState();
    }

    @Override
    public OrderItemState cancel() {
        return new CancelledState();
    }

    @Override
    public OrderItemState refund() {
        return new RefundRequestedState();
    }

    @Override
    public OrderItemState approveRefund() {
        throw new IllegalStateException("Cannot approve refund from Processing state.");
    }

    @Override
    public OrderItemState denyRefund() {
        throw new IllegalStateException("Cannot deny refund from Processing state.");
    }
}
