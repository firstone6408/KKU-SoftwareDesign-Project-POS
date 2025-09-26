package com.sdp.pos.service.order.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OrderAlreadyHasInvoiceException extends ResponseStatusException {
    public OrderAlreadyHasInvoiceException(String orderId) {
        super(HttpStatus.BAD_REQUEST, "Order with ID " + orderId + " already has an invoice.");
    }
}
