package com.sdp.pos.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdp.pos.dto.product.AdjustStockProductRequestDTO;
import com.sdp.pos.dto.product.ProductRequestDTO;
import com.sdp.pos.dto.product.UpdateProductRequestDTO;
import com.sdp.pos.service.product.contract.ProductService;
import com.sdp.pos.util.ApiResponse;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
    public ResponseEntity<?> getProductList() {
        return ApiResponse.success(productService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable String id) {
        return ApiResponse.success(productService.getById(id));
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductRequestDTO requestDTO) {
        return ApiResponse.success(HttpStatus.CREATED, "Product created success", productService.create(requestDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable String id,
            @Valid @RequestBody UpdateProductRequestDTO requestDTO) {
        return ApiResponse.success("Product updated success", productService.update(id, requestDTO));
    }

    @PutMapping("/{id}/adjust-stock")
    public ResponseEntity<?> adjustStockProduct(@PathVariable String id,
            @RequestBody AdjustStockProductRequestDTO requestDTO) {

        productService.adjustStock(id, requestDTO);
        return ApiResponse.success("Adjust stock product success");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id) {
        productService.delete(id);
        return ApiResponse.success("Product deleted success");
    }

}
