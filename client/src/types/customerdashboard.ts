export interface LoyaltyPointsResponse {
    points: number;
  }
  
  export interface WalletBalanceResponse {
    balance: number;
  }
  
  export interface AddWalletFundsResponse {
    updatedBalance: number;
  }
  
  export type ApiError = {
    message: string;
    status: number;
  };
  