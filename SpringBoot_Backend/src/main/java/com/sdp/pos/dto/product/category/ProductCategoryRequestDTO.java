package com.sdp.pos.dto.product.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductCategoryRequestDTO {
    @NotBlank(message = "name is required")
    @Size(min = 2)
    private String name;

    public ProductCategoryRequestDTO(String name) {
        this.name = name;
    }

}
