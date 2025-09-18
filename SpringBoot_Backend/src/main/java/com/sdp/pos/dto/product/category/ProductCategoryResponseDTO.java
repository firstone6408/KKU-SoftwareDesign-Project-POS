package com.sdp.pos.dto.product.category;

import com.sdp.pos.entity.ProductCategoryEntity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductCategoryResponseDTO {
    private final String id;

    private String name;

    public ProductCategoryResponseDTO(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public static ProductCategoryResponseDTO fromEntity(ProductCategoryEntity category) {
        return new ProductCategoryResponseDTO(category.getId(), category.getName());
    }
}
