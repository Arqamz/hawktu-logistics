
export interface Address {
  country: string;
  city: string;
  district: string;
  addressLineOne: string;
  addressLineTwo?: string;
  additionalInfo?: string;
}
export interface CustomerInfoResponse {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: Address;
    wallet: Number;
  }
  
  export interface UpdateCustomerInfoRequest {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: Address;

  }
  
  export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
  }
  