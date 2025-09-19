package com.sdp.pos.service.order.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OpenOrderExistsException extends ResponseStatusException {
    public OpenOrderExistsException(String id) {
        super(HttpStatus.NOT_FOUND, "Customer has an open order already: " + id);
    }
}
