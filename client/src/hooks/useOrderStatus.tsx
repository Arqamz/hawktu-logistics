import { useState } from 'react';
import { fetchOrderStatus } from '@/api/shop';
import { OrderStatusDTO } from '@/types/shop';

const useOrderStatus = () => {
  const [orderStatus, setOrderStatus] = useState<OrderStatusDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getOrderStatus = async (orderId: number) => {
    setLoading(true);
    setError(null);
    try {
      const status = await fetchOrderStatus(orderId);
      setOrderStatus(status);
      return status;
    } catch (err) {
      setError('Failed to fetch order status');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getOrderStatus, orderStatus, loading, error };
};

export default useOrderStatus;

