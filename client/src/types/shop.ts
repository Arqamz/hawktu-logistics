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

export interface Address {
  country: string;
  city: string;
  district: string;
  addressLineOne: string;
  addressLineTwo?: string;
  additionalInfo?: string;
}


export interface CartProductDTO {
  productId: number;
  quantity: number;
}

export interface CartDTO {
  email: string;
  cartProducts: CartProductDTO[];
  deliveryAddress: Address;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  state: string;
  refundMessage: string | null;
  refundResponse: string | null;
  deliveryAddress: Address;
  currentState: object;
}

export interface OrderResponse {
  id: number;
  createdAt: string;
  orderItems: OrderItem[];
}