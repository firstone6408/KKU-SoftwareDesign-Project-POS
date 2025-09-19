package com.sdp.pos.service.order.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OrderNotFoundException extends ResponseStatusException {
    public OrderNotFoundException(String id) {
        super(HttpStatus.NOT_FOUND, "Order not found: " + id);
    }
}
