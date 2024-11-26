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
    public OrderItemState requestRefund() {
        throw new IllegalStateException("Cannot request refund before order has been delivered.");
    }

    @Override
    public OrderItemState approveRefund() {
        throw new IllegalStateException("Cannot approve refund from Processing state.");
    }

    @Override
    public OrderItemState denyRefund() {
        throw new IllegalStateException("Cannot deny refund from Processing state.");
    }

    @Override
    public boolean canNext() {
        return true;
    }

    @Override
    public boolean canCancel() {
        return true;
    }

    @Override
    public boolean canRequestRefund() {
        return false;
    }

    @Override
    public boolean canApproveRefund() {
        return false;
    }

    @Override
    public boolean canDenyRefund() {
        return false;
    }

    @Override
    public boolean canReview() {
        return false;
    }
}
