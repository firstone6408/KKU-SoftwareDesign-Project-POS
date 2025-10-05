package com.sdp.pos.service.product.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ProductCodeGenerationException extends ResponseStatusException {
    public ProductCodeGenerationException(String message) {
        super(HttpStatus.BAD_REQUEST, "Cannot initialize product code counter");
    }
}
