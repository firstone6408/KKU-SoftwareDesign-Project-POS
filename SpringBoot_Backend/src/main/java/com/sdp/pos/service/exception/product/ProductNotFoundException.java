package com.sdp.pos.service.exception.product;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ProductNotFoundException extends ResponseStatusException {
    public ProductNotFoundException(String id) {
        super(HttpStatus.NOT_FOUND, "Product not found: " + id);
    }
}
