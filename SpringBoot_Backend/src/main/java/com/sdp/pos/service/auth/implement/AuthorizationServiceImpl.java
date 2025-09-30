package com.sdp.pos.service.auth.implement;

import org.springframework.stereotype.Service;

import com.sdp.pos.constant.PermissionEnum;
import com.sdp.pos.constant.UserRoleEnum;
import com.sdp.pos.context.user.UserContextProvider;
import com.sdp.pos.entity.UserEntity;
import com.sdp.pos.service.auth.contract.AuthorizationService;
import com.sdp.pos.service.auth.exception.UnauthorizedException;

@Service
public class AuthorizationServiceImpl implements AuthorizationService {
    private final UserContextProvider userContextProvider;

    public AuthorizationServiceImpl(UserContextProvider userContextProvider) {
        this.userContextProvider = userContextProvider;
    }

    @Override
    public void checkPermission(PermissionEnum permission) {

        UserEntity user = userContextProvider.getCurrentUser();

        UserRoleEnum role = user.getRole();

        boolean allowed = switch (role) {
            case ADMIN -> true; // admin ทำได้ทุกอย่าง
            case SELLER -> switch (permission) {
                case PRODUCT_VIEW, PRODUCT_CATEGORY_VIEW, SUPPLIER_VIEW -> true;
                default -> false;
            };
        };

        if (!allowed) {
            throw new UnauthorizedException("Not Allowed");
        }
    }

}
