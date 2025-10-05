package com.sdp.pos.service.order.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OrderItemEmptyException extends ResponseStatusException {
    public OrderItemEmptyException(String orderId) {
        super(HttpStatus.BAD_REQUEST, "Order has no items");
    }
}
