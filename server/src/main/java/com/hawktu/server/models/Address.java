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

    // Convert Address to String representation with separator %#.
    public String toStringRepresentation() {
        return String.join("%#", country, city, district, addressLineOne, addressLineTwo != null ? addressLineTwo : "", additionalInfo != null ? additionalInfo : "");
    }

    // Convert String representation back to Address object.
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
