package com.hawktu.server.models;

public class Address {

    private String country;
    private String city;
    private String district;
    private String addressLineOne;
    private String addressLineTwo;
    private String additionalInfo;

    public Address() {}

    public Address(String country, String city, String district, String addressLineOne, String addressLineTwo, String additionalInfo) {
        this.country = country;
        this.city = city;
        this.district = district;
        this.addressLineOne = addressLineOne;
        this.addressLineTwo = addressLineTwo;
        this.additionalInfo = additionalInfo;
    }

        public String getCountry() {
            return country;
        }
    
        public void setCountry(String country) {
            this.country = country;
        }
    
        public String getCity() {
            return city;
        }
    
        public void setCity(String city) {
            this.city = city;
        }
    
        public String getDistrict() {
            return district;
        }
    
        public void setDistrict(String district) {
            this.district = district;
        }
    
        public String getAddressLineOne() {
            return addressLineOne;
        }
    
        public void setAddressLineOne(String addressLineOne) {
            this.addressLineOne = addressLineOne;
        }
    
        public String getAddressLineTwo() {
            return addressLineTwo;
        }
    
        public void setAddressLineTwo(String addressLineTwo) {
            this.addressLineTwo = addressLineTwo;
        }
    
        public String getAdditionalInfo() {
            return additionalInfo;
        }
    
        public void setAdditionalInfo(String additionalInfo) {
            this.additionalInfo = additionalInfo;
        }


    public String toStringRepresentation() {
        return String.join("%#", country, city, district, addressLineOne, addressLineTwo != null ? addressLineTwo : "", additionalInfo != null ? additionalInfo : "");
    }

    public static Address fromStringRepresentation(String addressString) {
        String[] parts = addressString.split("%#");

        if (parts.length < 4) {
            throw new IllegalArgumentException("Invalid address string format");
        }

        String country = parts[0];
        String city = parts[1];
        String district = parts[2];
        String addressLineOne = parts[3];
        String addressLineTwo = (parts.length > 4 && !parts[4].isEmpty()) ? parts[4] : null;
        String additionalInfo = (parts.length > 5 && !parts[5].isEmpty()) ? parts[5] : null;

        return new Address(country, city, district, addressLineOne, addressLineTwo, additionalInfo);
    }

    @Override
    public String toString() {
        return String.format("Address[country=%s, city=%s, district=%s, addressLineOne=%s, addressLineTwo=%s, additionalInfo=%s]",
                country, city, district, addressLineOne, addressLineTwo, additionalInfo);
    }
}
