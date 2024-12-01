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
      businessName:string;
    }
    export interface UpdatSellerInfoRequest {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        address: Address;
        businessName:string;
    
      }
      
      export interface ChangePasswordRequest {
        currentPassword: string;
        newPassword: string;
      }