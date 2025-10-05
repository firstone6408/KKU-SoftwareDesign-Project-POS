package com.sdp.pos.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdp.pos.annotation.RequireRole;
import com.sdp.pos.constant.UserRoleEnum;
import com.sdp.pos.dto.product.AdjustStockProductRequestDTO;
import com.sdp.pos.dto.product.AdjustUnitPriceProductRequestDTO;
import com.sdp.pos.dto.product.ProductRequestDTO;
import com.sdp.pos.dto.product.ProductResponseDTO;
import com.sdp.pos.dto.product.UpdateProductRequestDTO;
import com.sdp.pos.service.product.contract.ProductService;
import com.sdp.pos.util.ApiResponse;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponseDTO>>> getProductList() {
        return ApiResponse.success(productService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponseDTO>> getProductById(@PathVariable String id) {
        return ApiResponse.success(productService.getById(id));
    }

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    @RequireRole({ UserRoleEnum.ADMIN })
    public ResponseEntity<ApiResponse<ProductResponseDTO>> createProduct(
            @Valid @RequestBody @ModelAttribute ProductRequestDTO requestDTO) {
        return ApiResponse.success(HttpStatus.CREATED, "Product created success", productService.create(requestDTO));
    }

    @PutMapping(value = "/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    @RequireRole({ UserRoleEnum.ADMIN })
    public ResponseEntity<ApiResponse<ProductResponseDTO>> updateProduct(@PathVariable String id,
            @Valid @RequestBody @ModelAttribute UpdateProductRequestDTO requestDTO) {
        return ApiResponse.success("Product updated success", productService.update(id, requestDTO));
    }

    @PutMapping("/{id}/adjust-stock")
    @RequireRole({ UserRoleEnum.ADMIN })
    public ResponseEntity<ApiResponse<Object>> adjustStockProduct(@PathVariable String id,
            @Valid @RequestBody AdjustStockProductRequestDTO requestDTO) {

        productService.adjustStock(id, requestDTO);
        return ApiResponse.success("Adjust stock product success");
    }

    @PutMapping("/{id}/adjust-unit-price")
    @RequireRole({ UserRoleEnum.ADMIN })
    public ResponseEntity<ApiResponse<Object>> adjustUnitPriceProduct(@PathVariable String id,
            @RequestBody AdjustUnitPriceProductRequestDTO requestDTO) {
        productService.adjustUnitPrice(id, requestDTO);
        return ApiResponse.success("Adjust unit price product success");
    }

    @DeleteMapping("/{id}")
    @RequireRole({ UserRoleEnum.ADMIN })
    public ResponseEntity<ApiResponse<Object>> deleteProduct(@PathVariable String id) {
        productService.delete(id);
        return ApiResponse.success("Product deleted success");
    }

}
