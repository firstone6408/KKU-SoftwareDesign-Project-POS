package com.sdp.pos.service.order.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OrderNotCanceledException extends ResponseStatusException {
    public OrderNotCanceledException(String message) {
        super(HttpStatus.BAD_REQUEST, "Order not canceled: " + message);
    }
}
