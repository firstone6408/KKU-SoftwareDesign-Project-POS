package com.sdp.pos.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdp.pos.dto.user.UserRequestDTO;
import com.sdp.pos.dto.user.UserResponseDTO;
import com.sdp.pos.service.user.contract.UserService;
import com.sdp.pos.util.ApiResponse;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponseDTO>>> getUserList() {
        return ApiResponse.success(userService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponseDTO>> getUserById(@PathVariable String id) {
        return ApiResponse.success(userService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponseDTO>> updateUser(@PathVariable String id,
            @Valid @RequestBody UserRequestDTO requestDTO) {
        return ApiResponse.success("Updated user success", userService.update(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteUser(@PathVariable String id) {
        userService.delete(id);
        return ApiResponse.success("Deleted user success");
    }

}
