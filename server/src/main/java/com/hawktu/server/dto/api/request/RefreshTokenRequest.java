package com.hawktu.server.dto.api.request;

public class RefreshTokenRequest {
    private String refreshToken;

    // Constructor, getters, setters
    public RefreshTokenRequest() {}

    public RefreshTokenRequest(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}