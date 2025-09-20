package com.sdp.pos.interceptor;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    /*
     * preHandle คือ ทำก่อนไปถึง Controller
     * 
     * หมายเหตุ การใส่ @NonNull คือเพื่อที่จะการันตีว่า มันจะไม่เป็น Null แน่นอน
     */
    @Override
    public boolean preHandle(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
            @NonNull Object Handler) {
        System.out.println("Incoming request: " + request.getMethod() + " " + request.getRequestURI());

        return true;
    }

    @Override
    public void postHandle(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull Object handler,
            @Nullable ModelAndView modelAndView) throws Exception {
        System.out.println("Request processed, status=" + response.getStatus());
    }

    @Override
    public void afterCompletion(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull Object handler,
            @Nullable Exception ex) throws Exception {
        System.out.println(" - After completion, cleanup if needed");
    }
}
