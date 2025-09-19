package com.sdp.pos.dto.order.item;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderItemRemoveRequestDTO {
    @NotBlank(message = "orderItemId is required")
    private final String orderItemId;

    @Min(value = 1, message = "quantity must be at least 1")
    private final int quantity;
}
