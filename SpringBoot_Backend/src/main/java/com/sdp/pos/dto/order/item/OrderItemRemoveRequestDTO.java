package com.sdp.pos.dto.order.item;

import jakarta.validation.constraints.Min;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderItemRemoveRequestDTO {

    @Min(value = 1, message = "quantity must be at least 1")
    private final int quantity;
}
