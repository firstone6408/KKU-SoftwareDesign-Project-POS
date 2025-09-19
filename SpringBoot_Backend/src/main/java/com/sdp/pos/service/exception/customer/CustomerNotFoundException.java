package com.sdp.pos.service.exception.customer;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class CustomerNotFoundException extends ResponseStatusException {
    public CustomerNotFoundException(String id) {
        super(HttpStatus.NOT_FOUND, "Customer not found: " + id);
    }
}
