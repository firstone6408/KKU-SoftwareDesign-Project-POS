package com.sdp.pos.dto.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductRequestDTO {
    @NotBlank(message = "name is required")
    @Size(min = 2)
    private final String name;

    private final String description;

    @Min(value = 0, message = "unitPrice must be at least 0")
    private final double unitPrice;

    @Min(value = 0, message = "stockLevel must be at least 0")
    private final int stockLevel;

    @NotBlank(message = "stockLevel is required")
    private final String categoryId;

    @NotBlank(message = "supplierId is required")
    private final String supplierId;

}
