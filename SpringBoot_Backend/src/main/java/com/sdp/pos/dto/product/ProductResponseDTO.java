package com.sdp.pos.dto.product;

import com.sdp.pos.dto.product.category.ProductCategoryResponseDTO;
import com.sdp.pos.dto.supplier.SupplierResponseDTO;
import com.sdp.pos.entity.ProductEntity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductResponseDTO {
    private final String id;

    private final String productCode;

    private final String barcode;

    private final String name;

    private final String description;

    private final String imageUrl;

    private final Double unitPrice;

    private final Integer stockLevel;

    private final ProductCategoryResponseDTO category;

    private final SupplierResponseDTO supplier;

    public static ProductResponseDTO fromEntity(ProductEntity product) {

        return new ProductResponseDTO(product.getId(), product.getProductCode(), product.getBarcode(),
                product.getName(), product.getDescription(),
                product.getImageUrl(),
                product.getUnitPrice(), product.getStockLevel(),
                ProductCategoryResponseDTO.fromEntity(product.getCategory()),
                SupplierResponseDTO.fromEntity(product.getSupplier()));
    }
}
