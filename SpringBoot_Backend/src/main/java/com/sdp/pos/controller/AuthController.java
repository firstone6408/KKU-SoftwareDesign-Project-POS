package com.sdp.pos.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdp.pos.dto.auth.LoginRequestDTO;
import com.sdp.pos.dto.auth.LoginResponseDTO;
import com.sdp.pos.dto.user.UserRequestDTO;
import com.sdp.pos.dto.user.UserResponseDTO;
import com.sdp.pos.service.auth.contract.AuthService;
import com.sdp.pos.service.user.contract.UserService;
import com.sdp.pos.util.ApiResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
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

    @GetMapping("/current-user")
    public ResponseEntity<ApiResponse<UserResponseDTO>> currentUser(HttpServletRequest request) {
        String userId = (String) request.getAttribute("user-id");
        return ApiResponse.success("Verify success", userService.getById(userId));
    }

}
