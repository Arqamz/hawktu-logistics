package com.hawktu.server.states;

public class CancelledState implements OrderItemState {
    @Override
    public OrderItemState nextState() {
        throw new IllegalStateException("Cannot transition from Cancelled state.");
    }

    @Override
    public OrderItemState cancel() {
        throw new IllegalStateException("Order is already cancelled.");
    }

    @Override
    public OrderItemState refund() {
        return new RefundRequestedState();
    }

    @Override
    public OrderItemState approveRefund() {
        throw new IllegalStateException("Cannot approve refund from Cancelled state.");
    }

    @Override
    public OrderItemState denyRefund() {
        throw new IllegalStateException("Cannot deny refund from Cancelled state.");
    }
}
