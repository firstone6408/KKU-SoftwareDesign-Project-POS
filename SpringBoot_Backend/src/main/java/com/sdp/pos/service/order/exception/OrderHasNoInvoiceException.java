package com.sdp.pos.service.order.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OrderHasNoInvoiceException extends ResponseStatusException {
    public OrderHasNoInvoiceException(String orderId) {
        super(HttpStatus.BAD_REQUEST, "Order with ID " + orderId + " has no invoice yet.");
    }
}
