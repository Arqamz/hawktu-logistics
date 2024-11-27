
export interface Address {
    country: string;
    city: string;
    district: string;
    addressLineOne: string;
    addressLineTwo?: string;
    additionalInfo?: string;
  }
  
  export interface CustomerRegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    address: Address;
  }
  
  export interface SellerRegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    address: Address;
    businessName: string;

  }
  
  export interface RegistrationResponse {
    message: string;
    status: number;
  }
  