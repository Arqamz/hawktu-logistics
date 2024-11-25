package com.hawktu.server.states;

public interface OrderItemState {
    OrderItemState nextState();
    OrderItemState cancel();
    OrderItemState refund();
    OrderItemState approveRefund();
    OrderItemState denyRefund();
}
