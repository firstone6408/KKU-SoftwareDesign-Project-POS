package com.sdp.pos.interceptor;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.sdp.pos.context.user.implement.ThreadLocalUserContextProvider;
import com.sdp.pos.entity.UserEntity;
import com.sdp.pos.repository.UserRepository;
import com.sdp.pos.service.auth.exception.UnauthorizedException;
import com.sdp.pos.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    private final JwtUtil jwtUtil;
    private final ThreadLocalUserContextProvider userContextProvider;
    private final UserRepository userRepository;

    public AuthInterceptor(JwtUtil jwtUtil, ThreadLocalUserContextProvider userContextProvider,
            UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userContextProvider = userContextProvider;
        this.userRepository = userRepository;
    }

    /*
     * preHandle คือ ทำก่อนไปถึง Controller
     * 
     * หมายเหตุ การใส่ @NonNull คือเพื่อที่จะการันตีว่า มันจะไม่เป็น Null แน่นอน
     */
    @Override
    public boolean preHandle(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
            @NonNull Object Handler) {
        try {
            System.out.println("Incoming request: " + request.getMethod() + " " + request.getRequestURI());

            // return true;

            // แกะ header
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new UnauthorizedException("No Authorization header");
            }

            // แกะ token
            String token = authHeader.substring(7);

            // System.out.println(token);

            // validate token
            if (!jwtUtil.isTokenValid(token)) {
                throw new UnauthorizedException("Invalid token");
            }

            // check token exp
            if (jwtUtil.isTokenExpired(token)) {
                throw new UnauthorizedException("Token expired");
            }

            // save payload
            String userId = jwtUtil.getDataFromToken(token);
            if (userId == null) {
                throw new UnauthorizedException("Invalid tokenpayload");
            }

            // request.setAttribute(JwtPayloadEnum.USER_ID.toString(), userId);
            // set context
            UserEntity user = userRepository.findById(userId)
                    .orElseThrow(() -> new UnauthorizedException("User not found"));
            userContextProvider.setCurrentUser(user);

            return true;
        } catch (Exception e) {
            userContextProvider.clear();
            throw e;
        }
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

        // Clear เสมอ ไม่ว่าจะสำเร็จหรือไม่
        userContextProvider.clear();
        System.out.println(" - After completion, cleanup if needed");
    }
}
