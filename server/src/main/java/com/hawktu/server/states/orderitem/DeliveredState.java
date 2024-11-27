package com.hawktu.server.states.orderitem;

import com.hawktu.server.states.OrderItemState;

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
    public OrderItemState requestRefund() {
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

    @Override
    public boolean canNext() {
        return false;
    }

    @Override
    public boolean canCancel() {
        return false;
    }

    @Override
    public boolean canRequestRefund() {
        return true;
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
        return true;
    }
}
