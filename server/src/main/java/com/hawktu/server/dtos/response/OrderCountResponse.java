package com.hawktu.server.dtos.response;

public class OrderCountResponse {
    private int totalOrders;
    private int thisMonthOrders;
    private int lastMonthOrders;

    public OrderCountResponse(int totalOrders, int thisMonthOrders, int lastMonthOrders) {
        this.totalOrders = totalOrders;
        this.thisMonthOrders = thisMonthOrders;
        this.lastMonthOrders = lastMonthOrders;
    }

    public int getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(int totalOrders) {
        this.totalOrders = totalOrders;
    }

    public int getThisMonthOrders() {
        return thisMonthOrders;
    }

    public void setThisMonthOrders(int thisMonthOrders) {
        this.thisMonthOrders = thisMonthOrders;
    }

    public int getLastMonthOrders() {
        return lastMonthOrders;
    }

    public void setLastMonthOrders(int lastMonthOrders) {
        this.lastMonthOrders = lastMonthOrders;
    }
}
