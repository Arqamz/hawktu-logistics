package com.hawktu.server.states;

public class RefundRequestedState implements OrderItemState {

    @Override
    public OrderItemState nextState() {
        throw new IllegalStateException("Refund request must be processed before moving to another state.");
    }

    @Override
    public OrderItemState cancel() {
        throw new IllegalStateException("Cannot cancel an order in Refund Requested state.");
    }

    @Override
    public OrderItemState refund() {
        throw new IllegalStateException("Refund has already been requested.");
    }

    @Override
    public OrderItemState approveRefund() {
        return new RefundApprovedState();
    }

    @Override
    public OrderItemState denyRefund() {
        return new RefundDeniedState();
    }
}
