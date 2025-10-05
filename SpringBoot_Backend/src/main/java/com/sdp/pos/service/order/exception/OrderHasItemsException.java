package com.sdp.pos.service.order.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OrderHasItemsException extends ResponseStatusException {
    public OrderHasItemsException(String orderId) {
        super(HttpStatus.BAD_REQUEST, "Cannot delete order because it still has items");
    }
}
