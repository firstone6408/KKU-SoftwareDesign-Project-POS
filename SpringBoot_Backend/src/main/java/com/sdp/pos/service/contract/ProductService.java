package com.sdp.pos.service.contract;

import java.util.List;

import com.sdp.pos.dto.product.ProductRequestDTO;
import com.sdp.pos.dto.product.ProductResponseDTO;

public interface ProductService {
    List<ProductResponseDTO> getAll();

    ProductResponseDTO getById(String id);

    ProductResponseDTO create(ProductRequestDTO requestDTO);

    ProductResponseDTO update(String id, ProductRequestDTO requestDTO);

    void delete(String id);
}
