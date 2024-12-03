package com.hawktu.server.dtos.response;

public class ProductCountResponse {
    private Long totalProductCount;
    private Long thisMonthProductCount;
    private Long lastMonthProductCount;

    public ProductCountResponse() {
    }

    public ProductCountResponse(Long totalProductCount, Long thisMonthProductCount, Long lastMonthProductCount) {
        this.totalProductCount = totalProductCount;
        this.thisMonthProductCount = thisMonthProductCount;
        this.lastMonthProductCount = lastMonthProductCount;
    }

    public Long getTotalProductCount() {
        return totalProductCount;
    }

    public void setTotalProductCount(Long totalProductCount) {
        this.totalProductCount = totalProductCount;
    }

    public Long getThisMonthProductCount() {
        return thisMonthProductCount;
    }

    public void setThisMonthProductCount(Long thisMonthProductCount) {
        this.thisMonthProductCount = thisMonthProductCount;
    }

    public Long getLastMonthProductCount() {
        return lastMonthProductCount;
    }

    public void setLastMonthProductCount(Long lastMonthProductCount) {
        this.lastMonthProductCount = lastMonthProductCount;
    }
}
