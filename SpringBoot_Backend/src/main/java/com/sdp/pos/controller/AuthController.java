package com.sdp.pos.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdp.pos.dto.auth.LoginRequestDTO;
import com.sdp.pos.dto.auth.LoginResponseDTO;
import com.sdp.pos.dto.user.UserRequestDTO;
import com.sdp.pos.service.auth.contract.AuthService;
import com.sdp.pos.util.ApiResponse;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Object>> register(@Valid @RequestBody UserRequestDTO requestDTO) {
        authService.register(requestDTO);
        return ApiResponse.success("Registerd success");
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponseDTO>> login(@Valid @RequestBody LoginRequestDTO requestDTO) {
        return ApiResponse.success("Login success", authService.login(requestDTO));
    }

}
