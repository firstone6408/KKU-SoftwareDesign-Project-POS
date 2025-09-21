package com.sdp.pos.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginRequestDTO {
    @NotBlank(message = "username is required")
    private final String username;

    private final String password;

}
