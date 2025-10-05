package com.sdp.pos.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdp.pos.annotation.RequireRole;
import com.sdp.pos.constant.UserRoleEnum;
import com.sdp.pos.dto.product.category.ProductCategoryRequestDTO;
import com.sdp.pos.dto.product.category.ProductCategoryResponseDTO;
import com.sdp.pos.service.productcategory.contract.ProductCategoryService;
import com.sdp.pos.util.ApiResponse;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/product-categories")
public class ProductCategoryController {
    public final ProductCategoryService productCategoryService;

    public ProductCategoryController(ProductCategoryService productCategoryService) {
        this.productCategoryService = productCategoryService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductCategoryResponseDTO>>> getCategoryList() {
        return ApiResponse.success(productCategoryService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductCategoryResponseDTO>> getCategoryById(@PathVariable String id) {
        return ApiResponse.success(productCategoryService.getById(id));
    }

    @PostMapping
    @RequireRole({ UserRoleEnum.ADMIN })
    public ResponseEntity<ApiResponse<ProductCategoryResponseDTO>> createCategory(
            @Valid @RequestBody ProductCategoryRequestDTO requestDTO) {
        return ApiResponse.success(HttpStatus.CREATED, "Category created success",
                productCategoryService.create(requestDTO));
    }

    @PutMapping("/{id}")
    @RequireRole({ UserRoleEnum.ADMIN })
    public ResponseEntity<ApiResponse<ProductCategoryResponseDTO>> updateCategory(@PathVariable String id,
            @Valid @RequestBody ProductCategoryRequestDTO requestDTO) {
        return ApiResponse.success("Category updated success", productCategoryService.update(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    @RequireRole({ UserRoleEnum.ADMIN })
    public ResponseEntity<ApiResponse<Object>> deleteCategory(@PathVariable String id) {
        productCategoryService.delete(id);
        return ApiResponse.success("Category deleted success");
    }

}
