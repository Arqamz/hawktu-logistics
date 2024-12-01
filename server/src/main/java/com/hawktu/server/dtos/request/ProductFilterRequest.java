package com.hawktu.server.dtos.request;

import java.math.BigDecimal;

public class ProductFilterRequest {
    private Integer page = 0;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private Double minRating;
    private Double maxRating;
    private Long categoryId;
    private SortOption sortBy = SortOption.DEFAULT;

    // Enum for sorting options
    public enum SortOption {
        DEFAULT,           // Default sorting (likely by ID)
        PRICE_LOW_TO_HIGH, // Sort by price ascending
        PRICE_HIGH_TO_LOW, // Sort by price descending
        RATING_HIGH_TO_LOW // Sort by rating descending
    }

    // Constructors
    public ProductFilterRequest() {}

    // Getters and Setters
    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public BigDecimal getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(BigDecimal minPrice) {
        this.minPrice = minPrice;
    }

    public BigDecimal getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(BigDecimal maxPrice) {
        this.maxPrice = maxPrice;
    }

    public Double getMinRating() {
        return minRating;
    }

    public void setMinRating(Double minRating) {
        this.minRating = minRating;
    }

    public Double getMaxRating() {
        return maxRating;
    }

    public void setMaxRating(Double maxRating) {
        this.maxRating = maxRating;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public SortOption getSortBy() {
        return sortBy;
    }

    public void setSortBy(SortOption sortBy) {
        this.sortBy = sortBy;
    }
}