package com.sdp.pos.dto.order;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class DiscountExceedsTotalAmountException extends ResponseStatusException {
    public DiscountExceedsTotalAmountException(double discount, double totalAmount) {
        super(HttpStatus.BAD_REQUEST,
                String.format("Discount %.2f cannot exceed total amount %.2f", discount, totalAmount));
    }
}
