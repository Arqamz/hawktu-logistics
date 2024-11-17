package com.hawktu.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Allow CORS on all paths
                        .allowedOrigins("http://localhost:3000") // Allow requests from React app
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Include OPTIONS for preflight
                        .allowedHeaders("*") // Allow all headers
                        .allowCredentials(true); // Allow credentials if needed
            }
        };
    }
}
