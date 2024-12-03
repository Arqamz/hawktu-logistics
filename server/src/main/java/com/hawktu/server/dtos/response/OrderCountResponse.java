package com.hawktu.server.dtos.response;

public class OrderCountResponse {
    private Long totalOrders;
    private Long thisMonthOrders;
    private Long lastMonthOrders;

    public OrderCountResponse(Long totalOrders, Long thisMonthOrders, Long lastMonthOrders) {
        this.totalOrders = totalOrders;
        this.thisMonthOrders = thisMonthOrders;
        this.lastMonthOrders = lastMonthOrders;
    }

    public Long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public Long getThisMonthOrders() {
        return thisMonthOrders;
    }

    public void setThisMonthOrders(Long thisMonthOrders) {
        this.thisMonthOrders = thisMonthOrders;
    }

    public Long getLastMonthOrders() {
        return lastMonthOrders;
    }

    public void setLastMonthOrders(Long lastMonthOrders) {
        this.lastMonthOrders = lastMonthOrders;
    }
}
