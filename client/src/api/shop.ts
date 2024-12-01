import axiosInstance from '../config/axios';
import { ProductFilterRequest, ProductListResponse, Category, Review } from '../types/shop';

export const fetchProducts = async (filterRequest: ProductFilterRequest): Promise<ProductListResponse> => {
  try {
    const response = await axiosInstance.get<ProductListResponse>('/shop/products', {
      params: filterRequest,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get<Category[]>('/shop/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchReviews = async (productId: number): Promise<Review[]> => {
  try {
    const response = await axiosInstance.get<Review[]>(`/shop/reviews`, {
      params: { productId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

