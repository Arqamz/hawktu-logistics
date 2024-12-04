package com.hawktu.server.dtos.response;

import java.math.BigDecimal;

public class RevenueSummaryResponse {
    private BigDecimal totalRevenue;
    private BigDecimal thisMonthRevenue;
    private BigDecimal lastMonthRevenue;

    public RevenueSummaryResponse(BigDecimal totalRevenue, BigDecimal thisMonthRevenue, BigDecimal lastMonthRevenue) {
        this.totalRevenue = totalRevenue;
        this.thisMonthRevenue = thisMonthRevenue;
        this.lastMonthRevenue = lastMonthRevenue;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public BigDecimal getThisMonthRevenue() {
        return thisMonthRevenue;
    }

    public void setThisMonthRevenue(BigDecimal thisMonthRevenue) {
        this.thisMonthRevenue = thisMonthRevenue;
    }

    public BigDecimal getLastMonthRevenue() {
        return lastMonthRevenue;
    }

    public void setLastMonthRevenue(BigDecimal lastMonthRevenue) {
        this.lastMonthRevenue = lastMonthRevenue;
    }
}
