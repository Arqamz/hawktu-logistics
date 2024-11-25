package com.hawktu.server.states;

public class RefundApprovedState implements OrderItemState {

    @Override
    public OrderItemState nextState() {
        throw new IllegalStateException("Refund process is complete; no further state transitions.");
    }

    @Override
    public OrderItemState cancel() {
        throw new IllegalStateException("Cannot cancel an order that has already been refunded.");
    }

    @Override
    public OrderItemState refund() {
        throw new IllegalStateException("Refund has already been processed.");
    }

    @Override
    public OrderItemState approveRefund() {
        throw new IllegalStateException("Refund is already approved.");
    }

    @Override
    public OrderItemState denyRefund() {
        throw new IllegalStateException("Cannot deny an already approved refund.");
    }
}
