package com.hawktu.server.states.orderitem;

import com.hawktu.server.states.OrderItemState;

public enum OrderItemStateEnum {
    PROCESSING {
        @Override
        public OrderItemState getStateInstance() {
            return new ProcessingState();
        }
    },
    SHIPPED {
        @Override
        public OrderItemState getStateInstance() {
            return new ShippedState();
        }
    },
    CANCELLED {
        @Override
        public OrderItemState getStateInstance() {
            return new CancelledState();
        }
    },
    REFUND_APPROVED {
        @Override
        public OrderItemState getStateInstance() {
            return new RefundApprovedState();
        }
    },
    REFUND_DENIED {
        @Override
        public OrderItemState getStateInstance() {
            return new RefundDeniedState();
        }
    },
    REFUND_REQUESTED {
        @Override
        public OrderItemState getStateInstance() {
            return new RefundRequestedState();
        }
    },
    DELIVERED {
        @Override
        public OrderItemState getStateInstance() {
            return new DeliveredState();
        }
    };

    // Abstract method to be implemented by each enum value to return the state instance
    public abstract OrderItemState getStateInstance();

    // Utility method to convert from an OrderItemState instance to the corresponding enum
    public static OrderItemStateEnum fromState(OrderItemState state) {
        if (state instanceof ProcessingState) {
            return PROCESSING;
        } else if (state instanceof ShippedState) {
            return SHIPPED;
        } else if (state instanceof CancelledState) {
            return CANCELLED;
        } else if (state instanceof RefundApprovedState) {
            return REFUND_APPROVED;
        } else if (state instanceof RefundDeniedState) {
            return REFUND_DENIED;
        } else if (state instanceof RefundRequestedState) {
            return REFUND_REQUESTED;
        } else if (state instanceof DeliveredState) {
            return DELIVERED;
        }
        throw new IllegalArgumentException("Unknown state");
    }
}
