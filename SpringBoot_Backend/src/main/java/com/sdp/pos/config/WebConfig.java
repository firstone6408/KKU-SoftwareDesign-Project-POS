package com.sdp.pos.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.sdp.pos.interceptor.RoleInterceptor;
import com.sdp.pos.interceptor.AuthInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final AuthInterceptor authInterceptor;
    private final RoleInterceptor adminInterceptor;

    public WebConfig(AuthInterceptor authInterceptor, RoleInterceptor adminInterceptor) {
        this.authInterceptor = authInterceptor;
        this.adminInterceptor = adminInterceptor;
    }

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**") // อนุญาตทุก endpoint
                .allowedOrigins("http://localhost:3000", "https://pos-kku-sdp.vercel.app") // อนุญาตทุก origin
                .allowedMethods("GET", "POST", "PUT", "DELETE") // method ที่อนุญาต
                .allowedHeaders("Authorization", "Content-Type")// header ที่อนุญาต
                .allowCredentials(false); // ไม่รับ cookie / session
    }

    @Override
    public void addInterceptors(@NonNull InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/**") // apply ทุก endpoint
                .excludePathPatterns(// ยกเว้น path ที่ไม่อยากดัก
                        // sawgger
                        "/swagger-ui/**",
                        "/swagger-ui.html",
                        "/v3/api-docs/**",
                        "/v3/api-docs.yaml",
                        "/swagger-resources/**",
                        "/webjars/**",

                        // Auth APIs
                        "/api/auth/register/for-dev",
                        "/api/auth/login",

                        // Static resources
                        "/uploads/**");

        registry.addInterceptor(adminInterceptor);
    }
}
