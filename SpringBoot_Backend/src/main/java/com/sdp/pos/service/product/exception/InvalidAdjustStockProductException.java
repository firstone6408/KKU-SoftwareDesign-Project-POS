package com.sdp.pos.service.product.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InvalidAdjustStockProductException extends ResponseStatusException {
    public InvalidAdjustStockProductException(String type) {
        super(HttpStatus.NOT_FOUND, "Invalid stock adjustment type: " + type);
    }
}
