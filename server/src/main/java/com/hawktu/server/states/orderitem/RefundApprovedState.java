package com.hawktu.server.states.orderitem;

import com.hawktu.server.states.OrderItemState;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
@JsonSerialize
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
    public OrderItemState requestRefund() {
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
        return true;
    }
}
