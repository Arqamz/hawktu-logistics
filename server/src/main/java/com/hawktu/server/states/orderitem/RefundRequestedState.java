package com.hawktu.server.states.orderitem;

import com.hawktu.server.states.OrderItemState;

public class RefundRequestedState implements OrderItemState {

    @Override
    public OrderItemState nextState() {
        throw new IllegalStateException("Refund request must be processed before moving to another state.");
    }

    @Override
    public OrderItemState cancel() {
        throw new IllegalStateException("Cannot cancel an order which has been delivered.");
    }

    @Override
    public OrderItemState requestRefund() {
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
        return true;
    }

    @Override
    public boolean canDenyRefund() {
        return true;
    }

    @Override
    public boolean canReview() {
        return true;
    }
}
