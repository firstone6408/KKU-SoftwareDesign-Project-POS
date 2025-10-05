package com.sdp.pos.service.supplier.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class SupplierNotFoundException extends ResponseStatusException {
    public SupplierNotFoundException(String id) {
        super(HttpStatus.NOT_FOUND, "Supplier not found");
    }
}