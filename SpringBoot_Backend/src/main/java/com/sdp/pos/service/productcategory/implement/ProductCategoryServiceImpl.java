package com.sdp.pos.service.productcategory.implement;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.dto.product.category.ProductCategoryRequestDTO;
import com.sdp.pos.dto.product.category.ProductCategoryResponseDTO;
import com.sdp.pos.entity.ProductCategoryEntity;
import com.sdp.pos.repository.ProductCategoryRepository;
import com.sdp.pos.service.productcategory.contract.ProductCategoryService;
import com.sdp.pos.service.productcategory.validator.ProductCategoryValidator;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;
    private final ProductCategoryValidator productCategoryValidator;

    public ProductCategoryServiceImpl(ProductCategoryRepository productCategoryRepository,
            ProductCategoryValidator productCategoryValidator) {
        this.productCategoryRepository = productCategoryRepository;
        this.productCategoryValidator = productCategoryValidator;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductCategoryResponseDTO> getAll() {
        List<ProductCategoryEntity> categories = productCategoryRepository.findAllByOrderByNameAsc();
        return categories.stream().map(ProductCategoryResponseDTO::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProductCategoryResponseDTO getById(String id) {
        ProductCategoryEntity category = productCategoryValidator.validateCategoryExists(id);
        return ProductCategoryResponseDTO.fromEntity(category);
    }

    @Override
    @Transactional
    public ProductCategoryResponseDTO create(ProductCategoryRequestDTO requestDTO) {
        ProductCategoryEntity categoryEntity = new ProductCategoryEntity(requestDTO.getName());
        ProductCategoryEntity created = productCategoryRepository.save(categoryEntity);
        return ProductCategoryResponseDTO.fromEntity(created);
    }

    @Override
    @Transactional
    public ProductCategoryResponseDTO update(String id, ProductCategoryRequestDTO requestDTO) {
        // check category
        ProductCategoryEntity categoryToUpdate = productCategoryValidator.validateCategoryExists(id);

        // update
        categoryToUpdate.setName(requestDTO.getName());

        // save
        ProductCategoryEntity updated = productCategoryRepository.save(categoryToUpdate);

        return ProductCategoryResponseDTO.fromEntity(updated);
    }

    @Override
    @Transactional
    public void delete(String id) {
        // check category
        ProductCategoryEntity categoryToDelete = productCategoryValidator.validateCategoryExists(id);

        // delete
        productCategoryRepository.delete(categoryToDelete);
    }

}
