package com.sdp.pos.service.customer.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class CustomerCodeGenerationException extends ResponseStatusException {
    public CustomerCodeGenerationException(String message) {
        super(HttpStatus.BAD_REQUEST, "Cannot initialize customer code counter");
    }
}
