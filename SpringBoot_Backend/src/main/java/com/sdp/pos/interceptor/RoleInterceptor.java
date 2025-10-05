package com.sdp.pos.interceptor;

import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.HandlerInterceptor;

import com.sdp.pos.annotation.RequireRole;
import com.sdp.pos.constant.UserRoleEnum;
import com.sdp.pos.context.user.UserContextProvider;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RoleInterceptor implements HandlerInterceptor {
    private final UserContextProvider userContextProvider;;

    public RoleInterceptor(UserContextProvider userContextProvider) {
        this.userContextProvider = userContextProvider;
    }

    @Override
    public boolean preHandle(
            @NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
            @NonNull Object handler) {
        try {
            if (!(handler instanceof HandlerMethod)) {
                return true;
            }

            HandlerMethod handlerMethod = (HandlerMethod) handler;
            RequireRole requireRole = handlerMethod.getMethodAnnotation(RequireRole.class);

            // ข้ามที่ไม่ใช้
            if (requireRole == null) {
                return true;
            }

            var user = userContextProvider.getCurrentUser();

            // เช็คว่า user มี role ที่ annotation กำหนดหรือไม่
            boolean hasRequiredRole = false;
            for (UserRoleEnum role : requireRole.value()) {
                if (role.equals(user.getRole())) {
                    hasRequiredRole = true;
                    break;
                }
            }

            if (!hasRequiredRole) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied: insufficient role");
            }

            return true;
        } catch (Exception e) {
            throw e;
        }
    }
}
