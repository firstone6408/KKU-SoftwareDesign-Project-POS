package com.sdp.pos.service.order.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OrderNotPaidException extends ResponseStatusException {
    public OrderNotPaidException(String orderId) {
        super(HttpStatus.BAD_REQUEST, "Order " + orderId + " cannot be closed because payment has not been made.");
    }
}
