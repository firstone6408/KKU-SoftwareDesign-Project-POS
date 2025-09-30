package com.sdp.pos.service.auth.contract;

import com.sdp.pos.constant.PermissionEnum;

public interface AuthorizationService {
    void checkPermission(PermissionEnum permission);
}
