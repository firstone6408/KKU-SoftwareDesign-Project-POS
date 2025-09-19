package com.sdp.pos.dto.order;

import com.sdp.pos.constant.PaymentMethodEnum;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderCloseRequestDTO {
    @NotBlank(message = "orderId is required")
    private final String orderId;

    @Min(value = 0, message = " must be at least 0")
    private final double changeAmount;

    @Min(value = 0, message = " must be at least 0")
    private final double paidAmount;

    @NotNull
    private final PaymentMethodEnum paymentMethod;
}
