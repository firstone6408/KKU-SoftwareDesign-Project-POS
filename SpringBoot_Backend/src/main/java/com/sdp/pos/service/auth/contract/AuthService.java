package com.sdp.pos.service.auth.contract;

import com.sdp.pos.dto.auth.LoginRequestDTO;
import com.sdp.pos.dto.auth.LoginResponseDTO;
import com.sdp.pos.dto.auth.RegisterRequestDTO;

public interface AuthService {
    LoginResponseDTO login(LoginRequestDTO requestDTO);

    void register(RegisterRequestDTO requestDTO);
}
