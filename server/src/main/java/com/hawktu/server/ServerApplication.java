package com.hawktu.server;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ServerApplication {

    public static void main(String[] args) {
        // Load environment variables from .env file
        DotenvLoader.load();  

        SpringApplication.run(ServerApplication.class, args);
    }

    // CommandLineRunner for testing environment variable loading
    @Bean
    public CommandLineRunner run() {
        return args -> {
            // Print loaded environment variables
            System.out.println("Keystore Password: " + System.getenv("KEYSTORE_PASSWORD"));
            System.out.println("Keystore Alias: " + System.getenv("KEYSTORE_ALIAS"));
        };
    }
}
