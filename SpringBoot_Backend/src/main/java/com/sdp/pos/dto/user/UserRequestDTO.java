package com.sdp.pos.dto.user;

import com.sdp.pos.constant.UserRoleEnum;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserRequestDTO {
    @NotBlank(message = "email is required")
    @Email(message = "Invalid email format")
    private final String email;

    @NotBlank(message = "name is required")
    private final String name;

    private final String password;

    @NotNull(message = "role is required")
    private final UserRoleEnum role;

}
