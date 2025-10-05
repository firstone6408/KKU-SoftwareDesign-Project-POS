package com.sdp.pos.service.order.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OrderAlreadyPaidException extends ResponseStatusException {
    public OrderAlreadyPaidException(String orderId) {
        super(HttpStatus.BAD_REQUEST, "Order has already been paid");
    }
}
