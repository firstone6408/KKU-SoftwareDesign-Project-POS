package com.sdp.pos.context.user.implement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.sdp.pos.context.user.UserContextProvider;
import com.sdp.pos.entity.UserEntity;

@Component
public class ThreadLocalUserContextProvider implements UserContextProvider {
    private static final ThreadLocal<UserEntity> userHolder = new ThreadLocal<>();
    private static final Logger logger = LoggerFactory.getLogger(ThreadLocalUserContextProvider.class);

    /**
     * ตั้งค่า User สำหรับ thread ปัจจุบัน
     * ใช้โดย Interceptor เท่านั้น
     */
    public void setCurrentUser(UserEntity user) {
        if (user == null) {
            logger.warn("Attempting to set null user");
            return;
        }
        userHolder.set(user);
        logger.debug("Set user: userId={}, role={} for thread: {}",
                user.getId(),
                user.getRole(),
                Thread.currentThread().getName());
    }

    @Override
    public UserEntity getCurrentUser() {
        UserEntity user = userHolder.get();
        if (user == null) {
            logger.error("No user found in context for thread: {}", Thread.currentThread().getName());
            throw new IllegalStateException("No user context available. User may not be authenticated.");
        }
        return user;
    }

    /**
     * ลบ User จาก thread ปัจจุบัน
     * ใช้โดย Interceptor เท่านั้น (ใน afterCompletion)
     */
    public void clear() {
        UserEntity user = userHolder.get();
        userHolder.remove();
        if (user != null) {
            logger.debug("Cleared user: userId={} from thread: {}",
                    user.getId(),
                    Thread.currentThread().getName());
        }
    }

    /**
     * ตรวจสอบว่ามี user context หรือไม่
     */
    public boolean hasUser() {
        return userHolder.get() != null;
    }
}
