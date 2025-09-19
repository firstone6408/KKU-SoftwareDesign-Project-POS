package com.sdp.pos.service.exception.order;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OrderAlreadyClosedException extends ResponseStatusException {
    public OrderAlreadyClosedException(String orderId) {
        super(HttpStatus.BAD_REQUEST, "Order " + orderId + " is already closed and cannot be modified");
    }
}
