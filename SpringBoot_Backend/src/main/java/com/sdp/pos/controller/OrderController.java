package com.sdp.pos.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdp.pos.dto.order.CreateOrderRequestDTO;
import com.sdp.pos.service.contract.OrderService;
import com.sdp.pos.util.ApiResponse;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<?> postMethodName(@Valid @RequestBody CreateOrderRequestDTO requestDTO) {
        orderService.create(requestDTO);
        return ApiResponse.success(HttpStatus.CREATED, "Order created success");
    }

}
