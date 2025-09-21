package com.sdp.pos.dto.auth;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponseDTO {
    private final String token;

    public static LoginResponseDTO fromEntity(String token) {
        return new LoginResponseDTO(token);
    }
}
