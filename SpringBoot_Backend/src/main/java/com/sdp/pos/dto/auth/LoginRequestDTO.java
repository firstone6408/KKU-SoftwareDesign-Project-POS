package com.sdp.pos.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginRequestDTO {
    @NotBlank(message = "email is required")
    @Email(message = "Invalid email format")
    private final String email;

    private final String password;

}
