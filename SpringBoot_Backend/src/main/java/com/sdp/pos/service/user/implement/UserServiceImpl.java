package com.sdp.pos.service.user.implement;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.constant.PermissionEnum;
import com.sdp.pos.context.user.UserContextProvider;
import com.sdp.pos.dto.user.UserRequestDTO;
import com.sdp.pos.dto.user.UserResponseDTO;
import com.sdp.pos.entity.UserEntity;
import com.sdp.pos.repository.UserRepository;
import com.sdp.pos.service.auth.contract.AuthorizationService;
import com.sdp.pos.service.user.contract.UserService;
import com.sdp.pos.service.user.validator.UserValidator;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserValidator userValidator;
    private final PasswordEncoder passwordEncoder;
    private final UserContextProvider userContextProvider;
    private final AuthorizationService authorizationService;

    UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
            UserContextProvider userContextProvider, AuthorizationService authorizationService,
            UserValidator userValidator) {
        this.userRepository = userRepository;
        this.userValidator = userValidator;
        this.passwordEncoder = passwordEncoder;
        this.userContextProvider = userContextProvider;
        this.authorizationService = authorizationService;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponseDTO> getAll() {
        // check permission
        authorizationService.checkPermission(PermissionEnum.USER_VIEW);

        List<UserEntity> users = userRepository.findAllByOrderByEmailAsc();
        return users.stream().map(UserResponseDTO::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDTO getById(String userId) {
        // check permission
        authorizationService.checkPermission(PermissionEnum.USER_VIEW);

        UserEntity user = userValidator.validateUserExists(userId);

        return UserResponseDTO.fromEntity(user);
    }

    @Override
    @Transactional
    public UserResponseDTO getCurrentUser() {
        return UserResponseDTO.fromEntity(userContextProvider.getCurrentUser());
    }

    @Override
    @Transactional
    public UserResponseDTO update(String userId, UserRequestDTO requestDTO) {
        // check permission
        authorizationService.checkPermission(PermissionEnum.USER_UPDATE);

        // check
        UserEntity userToUpdate = userValidator.validateUserExists(userId);

        if (requestDTO.getPassword() != null) {
            // hashed new password
            String newHasdedPassword = passwordEncoder.encode(requestDTO.getPassword());
            userToUpdate.setPassword(newHasdedPassword);
        }

        // update
        userToUpdate.setEmail(requestDTO.getEmail());
        userToUpdate.setName(requestDTO.getName());
        userToUpdate.setRole(requestDTO.getRole());

        // save
        UserEntity updated = userRepository.save(userToUpdate);

        return UserResponseDTO.fromEntity(updated);
    }

    @Override
    @Transactional
    public void delete(String userId) {
        // check permission
        authorizationService.checkPermission(PermissionEnum.USER_DELETE);

        // check
        UserEntity userToDelete = userValidator.validateUserExists(userId);

        // delete
        userRepository.delete(userToDelete);
    }

}
