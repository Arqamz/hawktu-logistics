// // Example usage of the BCryptPasswordEncoder to implement hashed password logic for login and signup

// package com.hawktu.server;

// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

// public class PasswordHasher {
//     public static void main(String[] args) {
//         BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
//         String rawPassword = "mypassword123";
//         String hashedPassword = encoder.encode(rawPassword);
//         System.out.println("Hashed password: " + hashedPassword);

//         String inputPassword = "mypassword123";
//         boolean matches = encoder.matches(inputPassword, hashedPassword);
        
//         if (matches) {
//             System.out.println("The raw password matches the hashed password.");
//         } else {
//             System.out.println("The raw password does NOT match the hashed password.");
//         }
//     }
// }
