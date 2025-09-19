package com.sdp.pos.service.productcategory.contract;

import java.util.List;

import com.sdp.pos.dto.product.category.ProductCategoryRequestDTO;
import com.sdp.pos.dto.product.category.ProductCategoryResponseDTO;

public interface ProductCategoryService {
    List<ProductCategoryResponseDTO> getAll();

    ProductCategoryResponseDTO getById(String id);

    ProductCategoryResponseDTO create(ProductCategoryRequestDTO requestDTO);

    ProductCategoryResponseDTO update(String id, ProductCategoryRequestDTO requestDTO);

    void delete(String id);
}
