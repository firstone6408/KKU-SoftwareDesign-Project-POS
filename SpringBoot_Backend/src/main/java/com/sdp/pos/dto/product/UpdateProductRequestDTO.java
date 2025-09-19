package com.sdp.pos.dto.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateProductRequestDTO {
    @NotBlank(message = "name is required")
    private final String name;

    @NotBlank(message = "categoryId is required")
    private final String categoryId;

    @NotBlank(message = "supplierId is required")
    private final String supplierId;

    @Min(value = 0, message = "unitPrice must be at least 0")
    private final double unitPrice;

    @NotBlank(message = "description is required")
    private final String description;

}
