package com.sdp.pos.service.exception.supplier;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class SupplierNotFoundException extends ResponseStatusException {
    public SupplierNotFoundException(String id) {
        super(HttpStatus.NOT_FOUND, "Supplier not found: " + id);
    }
}