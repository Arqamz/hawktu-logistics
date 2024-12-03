import { useState } from 'react';
import { createOrder } from '@/api/shop';
import { CartDTO } from '@/types/shop';

export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<any>(null); 

  const placeOrder = async (cartDTO: CartDTO) => {
    setLoading(true);
    setError(null);

    try {
      const orderData = await createOrder(cartDTO);
      setOrder(orderData);
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
