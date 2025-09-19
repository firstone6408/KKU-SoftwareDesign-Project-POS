package com.sdp.pos.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdp.pos.dto.order.OrderCloseRequestDTO;
import com.sdp.pos.dto.order.OrderCreateRequestDTO;
import com.sdp.pos.dto.order.OrderSaveRequestDTO;
import com.sdp.pos.dto.order.item.OrderItemCreateRequestDTO;
import com.sdp.pos.dto.order.item.OrderItemRemoveRequestDTO;
import com.sdp.pos.service.contract.OrderItemService;
import com.sdp.pos.service.contract.OrderService;
import com.sdp.pos.util.ApiResponse;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;
    private final OrderItemService orderItemService;

    public OrderController(OrderService orderService, OrderItemService orderItemService) {
        this.orderService = orderService;
        this.orderItemService = orderItemService;
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@Valid @RequestBody OrderCreateRequestDTO requestDTO) {
        orderService.create(requestDTO);
        return ApiResponse.success(HttpStatus.CREATED, "Order created success");
    }

    @PutMapping("/add-item/{id}")
    public ResponseEntity<?> addItem(@PathVariable String id,
            @Valid @RequestBody OrderItemCreateRequestDTO requestDTO) {
        orderItemService.addItem(id, requestDTO);
        return ApiResponse.success(HttpStatus.CREATED, "Add item success");
    }

    @PutMapping("/remove-item/{id}")
    public ResponseEntity<?> removeItem(@PathVariable String id,
            @Valid @RequestBody OrderItemRemoveRequestDTO requestDTO) {
        orderItemService.removeItem(id, requestDTO);

        return ApiResponse.success("Remove item success");
    }

    @PutMapping("/save/{id}")
    public ResponseEntity<?> saveOrder(@PathVariable String id, @Valid @RequestBody OrderSaveRequestDTO requestDTO) {
        orderService.save(id, requestDTO);
        return ApiResponse.success("Saved order success");
    }

    @PutMapping("/close/{id}")
    public ResponseEntity<?> closeOrder(@PathVariable String id, @Valid @RequestBody OrderCloseRequestDTO requestDTO) {
        orderService.close(id, requestDTO);

        return ApiResponse.success("Closed order success");
    }

}
