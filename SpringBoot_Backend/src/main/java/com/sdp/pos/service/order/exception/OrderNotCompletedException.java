package com.sdp.pos.service.order.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OrderNotCompletedException extends ResponseStatusException {
    public OrderNotCompletedException(String message) {
        super(HttpStatus.BAD_REQUEST, "Order not completed");
    }
}
