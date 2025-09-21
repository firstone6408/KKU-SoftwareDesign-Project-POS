package com.sdp.pos.dto.user;

import java.time.LocalDateTime;

import com.sdp.pos.constant.UserRoleEnum;
import com.sdp.pos.entity.UserEntity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponseDTO {
    private final String id;

    private final String email;

    private final String name;

    private final UserRoleEnum role;

    private final LocalDateTime lastLoginAt;

    public static UserResponseDTO fromEntity(UserEntity user) {
        return new UserResponseDTO(user.getId(), user.getEmail(), user.getName(), user.getRole(),
                user.getLastLoginAt());
    }
}
