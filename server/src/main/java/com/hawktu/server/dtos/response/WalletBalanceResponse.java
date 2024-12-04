package com.hawktu.server.dtos.response;

import java.math.BigDecimal;

public class WalletBalanceResponse {
    private BigDecimal walletBalance;

    public WalletBalanceResponse(BigDecimal walletBalance) {
        this.walletBalance = walletBalance;
    }

    public BigDecimal getWalletBalance() {
        return walletBalance;
    }

    public void setWalletBalance(BigDecimal walletBalance) {
        this.walletBalance = walletBalance;
    }
}
