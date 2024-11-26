package com.hawktu.server.states;

public interface OrderItemState {
    OrderItemState nextState();
    OrderItemState cancel();
    OrderItemState requestRefund();
    OrderItemState approveRefund();
    OrderItemState denyRefund();

    // Validation methods to check if actions are allowed in the current state
    boolean canNext();
    boolean canCancel();
    boolean canRequestRefund();
    boolean canApproveRefund();
    boolean canDenyRefund();
    // For customers to be able to review delivered orders
    boolean canReview();
}
