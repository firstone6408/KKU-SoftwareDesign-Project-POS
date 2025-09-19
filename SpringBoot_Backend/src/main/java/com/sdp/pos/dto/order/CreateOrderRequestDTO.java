package com.sdp.pos.dto.order;

import com.sdp.pos.constant.OrderStatusEnum;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateOrderRequestDTO {
    @NotBlank(message = "customerId is requird")
    private final String customerId;

    @NotNull(message = "status is requird")
    private final OrderStatusEnum status;
}
