package com.sdp.pos.dto.product.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductCategoryRequestDTO {
    @NotBlank(message = "name is required")
    @Size(min = 2)
    private final String name;

}
