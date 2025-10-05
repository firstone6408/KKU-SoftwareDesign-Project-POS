package com.sdp.pos.service.customer.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class CustomerNotFoundException extends ResponseStatusException {
    public CustomerNotFoundException(String id) {
        super(HttpStatus.NOT_FOUND, "Customer not found");
    }
}
