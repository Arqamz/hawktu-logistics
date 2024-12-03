package com.hawktu.server.dtos.response;

public class ProductCountResponse {
    private int productCount;

    public ProductCountResponse(int productCount) {
        this.productCount = productCount;
    }

    public int getProductCount() {
        return productCount;
    }

    public void setProductCount(int productCount) {
        this.productCount = productCount;
    }
}
