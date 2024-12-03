package com.hawktu.server.states;

import com.hawktu.server.states.orderitem.ProcessingState;
import com.hawktu.server.states.orderitem.ShippedState;
import com.hawktu.server.states.orderitem.CancelledState;
import com.hawktu.server.states.orderitem.RefundApprovedState;
import com.hawktu.server.states.orderitem.RefundDeniedState;
import com.hawktu.server.states.orderitem.RefundRequestedState;
import com.hawktu.server.states.orderitem.DeliveredState;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXISTING_PROPERTY, property = "stateType")
@JsonSubTypes({
    @JsonSubTypes.Type(value = ProcessingState.class, name = "PROCESSING"),
    @JsonSubTypes.Type(value = ShippedState.class, name = "SHIPPED"),
    @JsonSubTypes.Type(value = CancelledState.class, name = "CANCELLED"),
    @JsonSubTypes.Type(value = RefundApprovedState.class, name = "REFUND_APPROVED"),
    @JsonSubTypes.Type(value = RefundDeniedState.class, name = "REFUND_DENIED"),
    @JsonSubTypes.Type(value = RefundRequestedState.class, name = "REFUND_REQUESTED"),
    @JsonSubTypes.Type(value = DeliveredState.class, name = "DELIVERED")
})
public interface OrderItemState {
    OrderItemState nextState();
    OrderItemState cancel();
    OrderItemState requestRefund();
    OrderItemState approveRefund();
    OrderItemState denyRefund();

    boolean canNext();
    boolean canCancel();
    boolean canRequestRefund();
    boolean canApproveRefund();
    boolean canDenyRefund();
    boolean canReview();
}
