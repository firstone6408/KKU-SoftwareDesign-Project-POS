package com.sdp.pos.service.validator;

import org.springframework.stereotype.Component;

import com.sdp.pos.entity.ProductCategoryEntity;
import com.sdp.pos.entity.SupplierEntity;
import com.sdp.pos.repository.ProductCategoryRepository;
import com.sdp.pos.repository.SupplierRepository;
import com.sdp.pos.service.exception.product.category.CategoryNotFoundException;
import com.sdp.pos.service.exception.supplier.SupplierNotFoundException;

@Component
public class ProductValidator {
    private final ProductCategoryRepository productCategoryRepository;
    private final SupplierRepository supplierRepository;

    public ProductValidator(ProductCategoryRepository productCategoryRepository,
            SupplierRepository supplierRepository) {
        this.productCategoryRepository = productCategoryRepository;
        this.supplierRepository = supplierRepository;
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
