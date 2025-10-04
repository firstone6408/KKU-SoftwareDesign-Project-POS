package com.sdp.pos.service.product.validator;

import org.springframework.stereotype.Component;

import com.sdp.pos.entity.ProductCategoryEntity;
import com.sdp.pos.entity.ProductEntity;
import com.sdp.pos.entity.SupplierEntity;
import com.sdp.pos.repository.ProductCategoryRepository;
import com.sdp.pos.repository.ProductRepository;
import com.sdp.pos.repository.SupplierRepository;
import com.sdp.pos.service.product.exception.ProductNotFoundException;
import com.sdp.pos.service.productcategory.exception.CategoryNotFoundException;
import com.sdp.pos.service.supplier.exception.SupplierNotFoundException;

@Component
public class ProductValidator {
    private final ProductCategoryRepository productCategoryRepository;
    private final SupplierRepository supplierRepository;
    private final ProductRepository productRepository;

    public ProductValidator(ProductCategoryRepository productCategoryRepository,
            SupplierRepository supplierRepository, ProductRepository productRepository) {
        this.productCategoryRepository = productCategoryRepository;
        this.supplierRepository = supplierRepository;
        this.productRepository = productRepository;
    }

    public ProductEntity validateProductExists(String productId) {
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
        return product;
    }

    public ProductCategoryEntity validateCategory(String categoryId) {
        return productCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));
    }

    public SupplierEntity validateSupplier(String supplierId) {
        return supplierRepository.findById(supplierId)
                .orElseThrow(() -> new SupplierNotFoundException(supplierId));
    }

}
