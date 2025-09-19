package com.sdp.pos.dto.order;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Min;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderSaveRequestDTO {
    @Min(value = 0, message = "discount must be at least 0")
    private final double discount;

    private final String note;

    private final LocalDateTime deliveryDate;
}
