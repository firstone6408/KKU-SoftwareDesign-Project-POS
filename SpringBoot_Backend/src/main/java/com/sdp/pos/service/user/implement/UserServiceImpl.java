package com.sdp.pos.service.user.implement;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.dto.user.UserRequestDTO;
import com.sdp.pos.dto.user.UserResponseDTO;
import com.sdp.pos.entity.UserEntity;
import com.sdp.pos.repository.UserRepository;
import com.sdp.pos.service.user.contract.UserService;
import com.sdp.pos.service.user.exception.UserNotFoundException;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponseDTO> getAll() {
        List<UserEntity> users = userRepository.findAllByOrderByEmailAsc();
        return users.stream().map(UserResponseDTO::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDTO getById(String userId) {
        UserEntity user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));

        return UserResponseDTO.fromEntity(user);
    }

    @Override
    @Transactional
    public UserResponseDTO update(String userId, UserRequestDTO requestDTO) {
        // check
        UserEntity userToUpdate = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));

        // hashed new password
        String newHasdedPassword = passwordEncoder.encode(requestDTO.getPassword());

        // update
        userToUpdate.setEmail(requestDTO.getEmail());
        userToUpdate.setName(requestDTO.getName());
        userToUpdate.setRole(requestDTO.getRole());
        userToUpdate.setPassword(newHasdedPassword);

        // save
        UserEntity updated = userRepository.save(userToUpdate);

        return UserResponseDTO.fromEntity(updated);
    }

    @Override
    @Transactional
    public void delete(String userId) {
        // check
        UserEntity userToDelete = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));

        // delete
        userRepository.delete(userToDelete);
    }

}
