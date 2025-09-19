package com.sdp.pos.dto.product;

import com.sdp.pos.constant.AdjustStockProductEnum;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AdjustStockProductRequestDTO {

    @Min(value = 1, message = "quantity must be at least 0")
    private final int quantity;

    @NotNull(message = "adjustStockType is required")
    private final AdjustStockProductEnum adjustStockType;

}
