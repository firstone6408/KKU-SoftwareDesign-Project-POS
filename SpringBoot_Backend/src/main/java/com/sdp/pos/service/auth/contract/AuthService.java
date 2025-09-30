package com.sdp.pos.service.auth.contract;

import com.sdp.pos.dto.auth.LoginRequestDTO;
import com.sdp.pos.dto.auth.LoginResponseDTO;
import com.sdp.pos.dto.user.UserRequestDTO;
import com.sdp.pos.dto.user.UserResponseDTO;

public interface AuthService {
    LoginResponseDTO login(LoginRequestDTO requestDTO);

    UserResponseDTO register(UserRequestDTO requestDTO);
}
