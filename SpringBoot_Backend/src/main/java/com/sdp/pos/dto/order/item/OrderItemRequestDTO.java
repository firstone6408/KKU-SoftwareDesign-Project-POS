package com.sdp.pos.dto.order.item;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderItemRequestDTO {
    @NotBlank(message = "orderId is requird")
    private final String orderId;

    @NotBlank(message = "productId is requird")
    private final String productId;

    @Min(value = 1, message = "quantity must be at least 0")
    private final int quantity;

    @Min(value = 0, message = "quantity must be at least 0")
    private final double unitPrice;
}
