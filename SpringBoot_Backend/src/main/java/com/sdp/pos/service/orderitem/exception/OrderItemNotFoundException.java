package com.sdp.pos.service.orderitem.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OrderItemNotFoundException extends ResponseStatusException {
    public OrderItemNotFoundException(String id) {
        super(HttpStatus.NOT_FOUND, "Order item not found: " + id);
    }
}
