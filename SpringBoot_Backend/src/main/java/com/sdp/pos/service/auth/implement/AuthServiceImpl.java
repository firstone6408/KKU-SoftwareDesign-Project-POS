package com.sdp.pos.service.auth.implement;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.dto.auth.LoginRequestDTO;
import com.sdp.pos.dto.auth.LoginResponseDTO;
import com.sdp.pos.dto.auth.RegisterRequestDTO;
import com.sdp.pos.entity.UserEntity;
import com.sdp.pos.repository.UserRepository;
import com.sdp.pos.service.auth.contract.AuthService;
import com.sdp.pos.service.auth.exception.InvalidCredentialsException;
import com.sdp.pos.service.auth.exception.UserAlreadyExistsException;
import com.sdp.pos.service.auth.exception.UserNotFoundException;
import com.sdp.pos.util.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void register(RegisterRequestDTO requestDTO) {
        // check user is exists
        UserEntity existinUser = userRepository.findByUsername(requestDTO.getUsername());
        if (existinUser != null) {
            throw new UserAlreadyExistsException("Username already taken");
        }

        // hash password
        String hashedPassword = passwordEncoder.encode(requestDTO.getPassword());

        // create instance
        UserEntity userToCreate = new UserEntity();
        userToCreate.setUsername(requestDTO.getUsername());
        userToCreate.setRole(requestDTO.getRole());
        userToCreate.setPassword(hashedPassword);

        // save
        userRepository.save(userToCreate);
    }

    @Override
    @Transactional
    public LoginResponseDTO login(LoginRequestDTO requestDTO) {
        // check user
        UserEntity userToLogin = userRepository.findByUsername(requestDTO.getUsername());
        if (userToLogin == null) {
            throw new UserNotFoundException(requestDTO.getUsername());
        }

        // check password
        boolean isMatchedPassword = passwordEncoder.matches(requestDTO.getPassword(), userToLogin.getPassword());
        if (!isMatchedPassword) {
            throw new InvalidCredentialsException();
        }

        // generate jwt token
        String token = jwtUtil.generateToken(userToLogin.getId());

        // update last login
        userToLogin.setLastLoginAt(LocalDateTime.now());

        // save
        userRepository.save(userToLogin);

        return LoginResponseDTO.fromEntity(token);
    }

}
