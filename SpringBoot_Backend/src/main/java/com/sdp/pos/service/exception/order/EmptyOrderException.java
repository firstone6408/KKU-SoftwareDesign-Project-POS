package com.sdp.pos.service.exception.order;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class EmptyOrderException extends ResponseStatusException {
    public EmptyOrderException(String orderId) {
        super(HttpStatus.BAD_REQUEST, "Order " + orderId + " has no items.");
    }
}
