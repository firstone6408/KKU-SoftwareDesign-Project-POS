package com.sdp.pos.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdp.pos.dto.order.OrderCreateRequestDTO;
import com.sdp.pos.dto.order.OrderSaveRequestDTO;
import com.sdp.pos.dto.order.item.OrderItemCreateRequestDTO;
import com.sdp.pos.dto.order.item.OrderItemRemoveRequestDTO;
import com.sdp.pos.dto.saleinovice.PaymentRequestDTO;
import com.sdp.pos.service.order.contract.OrderService;
import com.sdp.pos.service.orderitem.contract.OrderItemService;
import com.sdp.pos.service.saleinovice.contract.SaleInoviceService;
import com.sdp.pos.util.ApiResponse;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;
    private final OrderItemService orderItemService;
    private final SaleInoviceService saleInoviceService;

    public OrderController(OrderService orderService, OrderItemService orderItemService,
            SaleInoviceService saleInoviceService) {
        this.orderService = orderService;
        this.orderItemService = orderItemService;
        this.saleInoviceService = saleInoviceService;
    }

    @GetMapping
    public ResponseEntity<?> getOrderList() {
        return ApiResponse.success(orderService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable String id) {
        return ApiResponse.success(orderService.getById(id));
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@Valid @RequestBody OrderCreateRequestDTO requestDTO) {
        orderService.create(requestDTO);
        return ApiResponse.success(HttpStatus.CREATED, "Order created success");
    }

    @PostMapping("/{orderId}/payment")
    public ResponseEntity<?> paymentOrder(@PathVariable String orderId,
            @Valid @RequestBody PaymentRequestDTO requestDTO) {
        saleInoviceService.payment(orderId, requestDTO);
        return ApiResponse.success("Save payment order success");
    }

    @PutMapping("/{orderId}/add-item")
    public ResponseEntity<?> addItem(@PathVariable String orderId,
            @Valid @RequestBody OrderItemCreateRequestDTO requestDTO) {
        orderItemService.addItem(orderId, requestDTO);
        return ApiResponse.success(HttpStatus.CREATED, "Add item success");
    }

    @PutMapping("/{orderId}/remove-item/{orderItemId}")
    public ResponseEntity<?> removeItem(@PathVariable String orderId, @PathVariable String orderItemId,
            @Valid @RequestBody OrderItemRemoveRequestDTO requestDTO) {

        orderItemService.removeItem(orderId, orderItemId, requestDTO);
        return ApiResponse.success("Remove item success");
    }

    @PutMapping("/{orderId}/save")
    public ResponseEntity<?> saveOrder(@PathVariable String orderId,
            @Valid @RequestBody OrderSaveRequestDTO requestDTO) {
        orderService.save(orderId, requestDTO);
        return ApiResponse.success("Saved order success");
    }

    @PutMapping("/{orderId}/close")
    public ResponseEntity<?> closeOrder(@PathVariable String orderId) {
        orderService.close(orderId);

        return ApiResponse.success("Closed order success");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable String id) {
        orderService.delete(id);
        return ApiResponse.success("Deleted order success");
    }

}
