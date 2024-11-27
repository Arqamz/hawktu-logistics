package com.hawktu.server.dtos.response;

import java.util.List;

public class ProductListResponse {
    private List<ProductDTO> products;
    private int numOfPages;
    private int currentPage;
    private long totalProducts;

    public ProductListResponse() {}

    public ProductListResponse(List<ProductDTO> products, int numOfPages, int currentPage, long totalProducts) {
        this.products = products;
        this.numOfPages = numOfPages;
        this.currentPage = currentPage;
        this.totalProducts = totalProducts;
    }

    public List<ProductDTO> getProducts() {
        return products;
    }

    public void setProducts(List<ProductDTO> products) {
        this.products = products;
    }

    public int getNumOfPages() {
        return numOfPages;
    }

    public void setNumOfPages(int numOfPages) {
        this.numOfPages = numOfPages;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(long totalProducts) {
        this.totalProducts = totalProducts;
    }
}