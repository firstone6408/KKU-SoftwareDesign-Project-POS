package com.sdp.pos.service.product.contract;

import java.util.List;

import com.sdp.pos.dto.product.AdjustStockProductRequestDTO;
import com.sdp.pos.dto.product.AdjustUnitPriceProductRequestDTO;
import com.sdp.pos.dto.product.ProductRequestDTO;
import com.sdp.pos.dto.product.ProductResponseDTO;
import com.sdp.pos.dto.product.UpdateProductRequestDTO;

public interface ProductService {
    List<ProductResponseDTO> getAll();

    ProductResponseDTO getById(String id);

    ProductResponseDTO create(ProductRequestDTO requestDTO);

    ProductResponseDTO update(String id, UpdateProductRequestDTO requestDTO);

    void delete(String id);

    void adjustStock(String productId, AdjustStockProductRequestDTO requestDTO);

    void adjustUnitPrice(String productId, AdjustUnitPriceProductRequestDTO requestDTO);

}
