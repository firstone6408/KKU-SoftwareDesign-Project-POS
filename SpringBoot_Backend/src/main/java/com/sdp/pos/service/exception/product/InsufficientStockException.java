package com.sdp.pos.service.exception.product;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InsufficientStockException extends ResponseStatusException {
    public InsufficientStockException(String productId, int requestedQty, int availableQty) {
        super(HttpStatus.BAD_REQUEST, String.format(
                "Insufficient stock for product %s: requested %d, available %d",
                productId, requestedQty, availableQty));
    }
}
