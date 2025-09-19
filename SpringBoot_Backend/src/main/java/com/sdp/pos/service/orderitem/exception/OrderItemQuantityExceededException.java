package com.sdp.pos.service.orderitem.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OrderItemQuantityExceededException extends ResponseStatusException {
    public OrderItemQuantityExceededException(int reqQty, int avaliQty) {
        super(HttpStatus.BAD_REQUEST, "Cannot remove more than existing quantity");
    }
}
