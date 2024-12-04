
export interface WalletBalanceResponse {
  walletBalance: number;
}

export interface RevenueSummaryResponse {
  totalRevenue: number;
  thisMonthRevenue: number;
  lastMonthRevenue: number;
}

export interface OrdersResponse {
  orders: OrderItemPayload[];
}

export interface OrderItemPayload {
  id: number;
  customerName: string;
  orderId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  deliveryAddress: Address;
  state: OrderItemStateEnum;
  refundMessage: string | null;
  refundResponse: string | null;
}

export interface OrderCountResponse {
  totalOrders: number;
  thisMonthOrders: number;
  lastMonthOrders: number;
}

export interface ProductCountResponse {
  totalProductCount: number;
  thisMonthProductCount: number;
  lastMonthProductCount: number;
}
export interface Address {
  country: string;
  city: string;
  district: string;
  addressLineOne: string;
  addressLineTwo?: string;
  additionalInfo?: string;
}
export interface SellerInfoResponse {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: Address;
  businessName: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatSellerInfoRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: Address;
  businessName: string;
}

export enum OrderItemStateEnum {
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  CANCELLED = 'CANCELLED',
  REFUND_APPROVED = 'REFUND_APPROVED',
  REFUND_DENIED = 'REFUND_DENIED',
  REFUND_REQUESTED = 'REFUND_REQUESTED',
  DELIVERED = 'DELIVERED',
}
export interface ReviewsResponse {
  reviews: Review[];
}

export interface Review {
  id: number;
  productId: number;
  rating: number;
  comment: string;
  createdAt: string; 
}