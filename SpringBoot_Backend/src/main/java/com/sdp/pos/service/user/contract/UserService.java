package com.sdp.pos.service.user.contract;

import java.util.List;

import com.sdp.pos.dto.user.UserRequestDTO;
import com.sdp.pos.dto.user.UserResponseDTO;

public interface UserService {
    List<UserResponseDTO> getAll();

    UserResponseDTO getById(String userId);

    UserResponseDTO update(String userId, UserRequestDTO requestDTO);

    void delete(String userId);
}
