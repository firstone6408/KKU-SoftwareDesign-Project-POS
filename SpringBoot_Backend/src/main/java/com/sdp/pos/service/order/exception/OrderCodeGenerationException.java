package com.sdp.pos.service.order.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OrderCodeGenerationException extends ResponseStatusException {
  public OrderCodeGenerationException(String message) {
    super(HttpStatus.BAD_REQUEST, "Cannot initialize order code counter");
  }
}
