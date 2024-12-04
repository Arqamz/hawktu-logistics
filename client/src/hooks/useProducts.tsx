import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, fetchCategories, fetchReviews } from '../api/shop';
import { Product, ProductFilterRequest, Category, Review } from '../types/shop';

export const useProducts = (initialFilter: ProductFilterRequest) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<ProductFilterRequest>(initialFilter);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchProducts(filter);
        setProducts(response.products);
        setTotalPages(response.numOfPages);
        setTotalProducts(response.totalProducts);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError('Failed to fetch categories');
      }
    };

    loadProducts();
    loadCategories();
  }, [filter]);

  const getReviews = useCallback(async (productId: number): Promise<Review[]> => {
    try {
      return await fetchReviews(productId);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      return [];
    }
  }, []);

  return { products, categories, loading, error, setFilter, totalPages, totalProducts, getReviews };
};

