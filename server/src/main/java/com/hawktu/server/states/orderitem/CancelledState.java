package com.hawktu.server.states.orderitem;

import com.hawktu.server.states.OrderItemState;

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
    public OrderItemState requestRefund() {
        throw new IllegalStateException("Cannot request refund for a cancelled order.");
    }

    @Override
    public OrderItemState approveRefund() {
        throw new IllegalStateException("Cannot approve refund from Cancelled state.");
    }

    @Override
    public OrderItemState denyRefund() {
        throw new IllegalStateException("Cannot deny refund from Cancelled state.");
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
