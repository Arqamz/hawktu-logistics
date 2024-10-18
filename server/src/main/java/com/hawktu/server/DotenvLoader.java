package com.hawktu.server;

import java.nio.file.Paths;

import io.github.cdimascio.dotenv.Dotenv;

public class DotenvLoader {

    // Static method to load the .env file from the server directory
    public static void load() {
        // Load the .env file from the server folder using an absolute path
        Dotenv dotenv = Dotenv.configure()
                .directory(Paths.get("").toAbsolutePath().toString()) // This ensures the path is from the 'server' folder
                .load();

        System.out.println("Dotenv loaded from: " + dotenv.get("KEYSTORE_PASSWORD"));  // Example: Print one of the environment variables
    }
}
