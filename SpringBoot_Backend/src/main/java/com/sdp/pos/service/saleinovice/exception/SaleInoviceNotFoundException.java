package com.sdp.pos.service.saleinovice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class SaleInoviceNotFoundException extends ResponseStatusException {
    public SaleInoviceNotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, "Sale Inovice not found");
    }
}
