package com.sdp.pos.dto.order;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderSaveRequestDTO {
    @NotBlank(message = "orderId is required")
    private final String orderId;

    @Min(value = 0, message = "discount must be at least 0")
    private final double discount;

    private final LocalDateTime deliveryDate;
}
