import { useState } from 'react';
import { createOrder } from '@/api/shop';
import { CartDTO } from '@/types/shop';

export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderResponse | null>(null); // Updated to use OrderResponse type

  const placeOrder = async (cartDTO: CartDTO): Promise<OrderResponse | void> => {
    setLoading(true);
    setError(null);

    try {
      const orderData = await createOrder(cartDTO);
      setOrder(orderData);
      return orderData; // Return order data here
    } catch (error) {
      setError('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    order,
    placeOrder,
  };
};
