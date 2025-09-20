package com.sdp.pos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/**") // อนุญาตทุก endpoint
                        .allowedOrigins("http://localhost:3000", "https://pos.example.com") // อนุญาตทุก origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // method ที่อนุญาต
                        .allowedHeaders("*")// header ที่อนุญาต
                        .allowCredentials(false); // ไม่รับ cookie / session

            }
        };
    }
}
