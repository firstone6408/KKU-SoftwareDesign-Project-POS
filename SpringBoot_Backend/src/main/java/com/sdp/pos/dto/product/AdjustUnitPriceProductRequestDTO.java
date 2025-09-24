package com.sdp.pos.dto.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AdjustUnitPriceProductRequestDTO {
    @NotBlank(message = "Unit price cannot be blank")
    @Min(value = 0, message = "Unit price must be at least 0")
    private final double unitPrice;

}
