package com.sdp.pos.dto.order;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderCreateRequestDTO {
    @NotBlank(message = "customerId is requird")
    private final String customerId;
}
