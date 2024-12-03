import { useState, useEffect } from 'react';
import { getSellerInfo, updateSellerInfo, changePassword, getWalletBalance, getRevenueSummary, getAllOrders, getOrderCounts, getRecentOrders, getActiveProductCount,getProductReviews } from '@/api/seller-dashboard';
import { SellerInfoResponse, UpdatSellerInfoRequest, ChangePasswordRequest, WalletBalanceResponse, RevenueSummaryResponse, OrdersResponse, OrderCountResponse, ProductCountResponse, ReviewsResponse } from '@/types/sellerdashboard';

// Seller Info Hook (unchanged)
export const useSellerInfo = () => {
  const [sellerInfo, setSellerInfo] = useState<SellerInfoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSellerInfo = async () => {
      try {
        const data = await getSellerInfo();
        setSellerInfo(data);
      } catch (err) {
        setError('Error fetching seller info');
      } finally {
        setLoading(false);
      }
    };

    fetchSellerInfo();
  }, []);

  return { sellerInfo, loading, error };
};

// Update Seller Info Hook (unchanged)
export const useUpdateSellerInfo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateInfo = async (data: UpdatSellerInfoRequest) => {
    try {
      setLoading(true);
      await updateSellerInfo(data);
    } catch (err) {
      setError('Error updating seller info');
    } finally {
      setLoading(false);
    }
  };

  return { updateInfo, loading, error };
};

// Change Password Hook (unchanged)
export const useChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const changePwd = async (data: ChangePasswordRequest) => {
    try {
      setLoading(true);
      await changePassword(data);
    } catch (err) {
      setError('Error changing password');
    } finally {
      setLoading(false);
    }
  };

  return { changePwd, loading, error };
};

// New Hook for Wallet Balance
export const useWalletBalance = () => {
  const [walletBalance, setWalletBalance] = useState<WalletBalanceResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const data = await getWalletBalance();
        setWalletBalance(data);
      } catch (err) {
        setError('Error fetching wallet balance');
      } finally {
        setLoading(false);
      }
    };

    fetchWalletBalance();
  }, []);

  return { walletBalance, loading, error };
};

// New Hook for Revenue Summary
export const useRevenueSummary = () => {
  const [revenueSummary, setRevenueSummary] = useState<RevenueSummaryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRevenueSummary = async () => {
      try {
        const data = await getRevenueSummary();
        setRevenueSummary(data);
      } catch (err) {
        setError('Error fetching revenue summary');
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueSummary();
  }, []);

  return { revenueSummary, loading, error };
};

// New Hook for Orders
export const useOrders = () => {
  const [orders, setOrders] = useState<OrdersResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        setError('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
};

// New Hook for Order Counts
export const useOrderCounts = () => {
  const [orderCounts, setOrderCounts] = useState<OrderCountResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderCounts = async () => {
      try {
        const data = await getOrderCounts();
        setOrderCounts(data);
      } catch (err) {
        setError('Error fetching order counts');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderCounts();
  }, []);

  return { orderCounts, loading, error };
};

// New Hook for Active Product Count
export const useActiveProductCount = () => {
  const [productCount, setProductCount] = useState<ProductCountResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const data = await getActiveProductCount();
        setProductCount(data);
      } catch (err) {
        setError('Error fetching active product count');
      } finally {
        setLoading(false);
      }
    };

    fetchProductCount();
  }, []);

  return { productCount, loading, error };
};
export const useRecentOrders = () => {
  const [recentOrders, setRecentOrders] = useState<OrdersResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const data = await getRecentOrders();
        setRecentOrders(data);
      } catch (err) {
        setError('Error fetching recent orders');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  return { recentOrders, loading, error };
};
export const useProductReviews = (productId: number) => {
  const [reviews, setReviews] = useState<ReviewsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductReviews = async () => {
      try {
        const data = await getProductReviews(productId);
        setReviews(data);
      } catch (err) {
        setError('Error fetching product reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchProductReviews();
  }, [productId]);

  return { reviews, loading, error };
};