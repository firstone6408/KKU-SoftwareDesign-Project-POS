package com.sdp.pos.context.user;

import com.sdp.pos.entity.UserEntity;

public interface UserContextProvider {

    UserEntity getCurrentUser();
}
