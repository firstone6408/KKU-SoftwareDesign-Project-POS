package com.sdp.pos.service.productcategory.validator;

import org.springframework.stereotype.Component;

import com.sdp.pos.entity.ProductCategoryEntity;
import com.sdp.pos.repository.ProductCategoryRepository;
import com.sdp.pos.service.productcategory.exception.CategoryNotFoundException;

@Component
public class ProductCategoryValidator {
    private final ProductCategoryRepository productCategoryRepository;

    public ProductCategoryValidator(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    public ProductCategoryEntity validateCategoryExists(String categoryId) {
        ProductCategoryEntity category = productCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));

        return category;
    }
}
