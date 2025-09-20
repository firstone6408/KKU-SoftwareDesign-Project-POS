package com.sdp.pos.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.sdp.pos.interceptor.AuthInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final AuthInterceptor authInterceptor;

    public WebConfig(AuthInterceptor authInterceptor) {
        this.authInterceptor = authInterceptor;
    }

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**") // อนุญาตทุก endpoint
                .allowedOrigins("http://localhost:3000", "https://pos.example.com") // อนุญาตทุก origin
                .allowedMethods("GET", "POST", "PUT", "DELETE") // method ที่อนุญาต
                .allowedHeaders("Authorization", "Content-Type")// header ที่อนุญาต
                .allowCredentials(false); // ไม่รับ cookie / session
    }

    @Override
    public void addInterceptors(@NonNull InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/**") // apply ทุก endpoint
                .excludePathPatterns("/uploads/**"); // ยกเว้น path ที่ไม่อยากดัก
    }
}
