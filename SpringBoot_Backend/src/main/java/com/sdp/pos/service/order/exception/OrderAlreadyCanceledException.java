package com.sdp.pos.service.order.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OrderAlreadyCanceledException extends ResponseStatusException {
    public OrderAlreadyCanceledException(String message) {
        super(HttpStatus.BAD_REQUEST, "Order is canceled");
    }
}
