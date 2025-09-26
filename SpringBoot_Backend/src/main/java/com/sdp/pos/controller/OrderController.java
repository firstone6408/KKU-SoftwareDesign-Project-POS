package com.sdp.pos.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdp.pos.dto.order.OrderCreateRequestDTO;
import com.sdp.pos.dto.order.OrderCreateResponseDTO;
import com.sdp.pos.dto.order.OrderResponseDTO;
import com.sdp.pos.dto.order.OrderSaveRequestDTO;
import com.sdp.pos.dto.order.item.OrderItemCreateRequestDTO;
import com.sdp.pos.dto.order.item.OrderItemRemoveRequestDTO;
import com.sdp.pos.dto.saleinovice.PaymentRequestDTO;
import com.sdp.pos.service.order.contract.OrderService;
import com.sdp.pos.service.orderitem.contract.OrderItemService;
import com.sdp.pos.service.saleinovice.contract.SaleInoviceService;
import com.sdp.pos.util.ApiResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

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
    public ResponseEntity<ApiResponse<List<OrderResponseDTO>>> getOrderList() {
        return ApiResponse.success(orderService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponseDTO>> getOrderById(@PathVariable String id) {
        return ApiResponse.success(orderService.getById(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<OrderCreateResponseDTO>> createOrder(
            @Valid @RequestBody OrderCreateRequestDTO requestDTO,
            HttpServletRequest request) {
        String userId = (String) request.getAttribute("user-id");

        return ApiResponse.success(HttpStatus.CREATED, "Order created success",
                orderService.create(userId, requestDTO));
    }

    @PostMapping(value = "/{orderId}/payment", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<ApiResponse<Object>> paymentOrder(@PathVariable String orderId,
            @Valid @ModelAttribute @RequestBody PaymentRequestDTO requestDTO) {
        saleInoviceService.payment(orderId, requestDTO);
        return ApiResponse.success("Save payment order success");
    }

    @PutMapping("/{orderId}/add-item")
    public ResponseEntity<ApiResponse<Object>> addItem(@PathVariable String orderId,
            @Valid @RequestBody OrderItemCreateRequestDTO requestDTO) {
        orderItemService.addItem(orderId, requestDTO);
        return ApiResponse.success(HttpStatus.CREATED, "Add item success");
    }

    @PutMapping("/{orderId}/remove-item/{orderItemId}")
    public ResponseEntity<ApiResponse<Object>> removeItem(@PathVariable String orderId,
            @PathVariable String orderItemId,
            @Valid @RequestBody OrderItemRemoveRequestDTO requestDTO) {

        orderItemService.removeItem(orderId, orderItemId, requestDTO);
        return ApiResponse.success("Remove item success");
    }

    @PutMapping("/{orderId}/save")
    public ResponseEntity<ApiResponse<Object>> saveOrder(@PathVariable String orderId,
            @Valid @RequestBody OrderSaveRequestDTO requestDTO) {
        orderService.save(orderId, requestDTO);
        return ApiResponse.success("Saved order success");
    }

    @PutMapping("/{orderId}/close")
    public ResponseEntity<ApiResponse<Object>> closeOrder(@PathVariable String orderId) {
        orderService.close(orderId);

        return ApiResponse.success("Closed order success");
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<ApiResponse<Object>> cancelOrder(@PathVariable String orderId) {
        orderService.cancel(orderId);

        return ApiResponse.success("Canceled order success");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteOrder(@PathVariable String id) {
        orderService.delete(id);
        return ApiResponse.success("Deleted order success");
    }

    @DeleteMapping(value = "/{orderId}/payment")
    public ResponseEntity<ApiResponse<Object>> deletePayment(@PathVariable String orderId) {
        saleInoviceService.deletePayment(orderId);
        return ApiResponse.success("Deleted payment success");
    }

}
