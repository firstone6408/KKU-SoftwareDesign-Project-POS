package com.sdp.pos.service.auth.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UserNotFoundException extends ResponseStatusException {
    public UserNotFoundException(String username) {
        super(HttpStatus.NOT_FOUND, "User with username '" + username + "' not found");
    }
}
