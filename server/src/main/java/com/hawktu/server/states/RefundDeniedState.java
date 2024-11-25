package com.hawktu.server.states;

public class RefundDeniedState implements OrderItemState {

    @Override
    public OrderItemState nextState() {
        throw new IllegalStateException("Refund process is complete; no further state transitions.");
    }

    @Override
    public OrderItemState cancel() {
        throw new IllegalStateException("Cannot cancel an order for which a refund was denied.");
    }

    @Override
    public OrderItemState refund() {
        throw new IllegalStateException("Refund has been denied.");
    }

    @Override
    public OrderItemState approveRefund() {
        throw new IllegalStateException("Cannot approve refund after it has been denied.");
    }

    @Override
    public OrderItemState denyRefund() {
        throw new IllegalStateException("Refund is already denied.");
    }
}
