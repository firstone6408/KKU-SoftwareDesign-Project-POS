package com.sdp.pos.service.user.validator;

import org.springframework.stereotype.Component;

import com.sdp.pos.entity.UserEntity;
import com.sdp.pos.repository.UserRepository;
import com.sdp.pos.service.user.exception.UserNotFoundException;

@Component
public class UserValidator {
    private final UserRepository userRepository;

    public UserValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity validateUserExists(String userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        return user;
    }
}
