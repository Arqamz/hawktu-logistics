export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: number;
  }
  
  export interface ProductListResponse {
    products: Product[];
    numOfPages: number;
    currentPage: number;
    totalProducts: number;
  }
  
  export interface ProductFilterRequest {
    page: number;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    maxRating?: number;
    categoryId?: number;
    sortBy: 'DEFAULT' | 'PRICE_LOW_TO_HIGH' | 'PRICE_HIGH_TO_LOW' | 'RATING_HIGH_TO_LOW';
  }
  
  export interface Category {
    id: number;
    name: string;
  }
  
  export interface Review {
    id: number;
    productId: number;
    userId: number;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
  }
  
  