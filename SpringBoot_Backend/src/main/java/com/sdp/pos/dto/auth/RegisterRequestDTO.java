package com.sdp.pos.dto.auth;

import com.sdp.pos.constant.UserRoleEnum;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RegisterRequestDTO {
    @NotBlank(message = "username is required")
    private final String username;

    private final String password;

    @NotNull(message = "role is required")
    private final UserRoleEnum role;

}
