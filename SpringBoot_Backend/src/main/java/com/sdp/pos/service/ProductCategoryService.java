package com.sdp.pos.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.sdp.pos.dto.product.category.ProductCategoryRequestDTO;
import com.sdp.pos.dto.product.category.ProductCategoryResponseDTO;
import com.sdp.pos.entity.ProductCategoryEntity;
import com.sdp.pos.repository.ProductCategoryRepository;

@Service
public class ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;

    public ProductCategoryService(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    @Transactional(readOnly = true)
    public List<ProductCategoryResponseDTO> getAll() {
        List<ProductCategoryEntity> categories = productCategoryRepository.findAll();
        return categories.stream().map(ProductCategoryResponseDTO::fromEntity).toList();
    }

    @Transactional(readOnly = true)
    public ProductCategoryResponseDTO getById(String id) {
        ProductCategoryEntity category = productCategoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category ID not found"));
        return ProductCategoryResponseDTO.fromEntity(category);
    }

    @Transactional
    public ProductCategoryResponseDTO create(ProductCategoryRequestDTO requestDTO) {
        ProductCategoryEntity categoryEntity = new ProductCategoryEntity(requestDTO.getName());
        ProductCategoryEntity created = productCategoryRepository.save(categoryEntity);
        return ProductCategoryResponseDTO.fromEntity(created);
    }

    @Transactional
    public ProductCategoryResponseDTO update(String id, ProductCategoryRequestDTO requestDTO) {
        // check category
        ProductCategoryEntity categoryToUpdate = productCategoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category ID not found"));

        // update
        categoryToUpdate.setName(requestDTO.getName());

        // save
        ProductCategoryEntity updated = productCategoryRepository.save(categoryToUpdate);

        return ProductCategoryResponseDTO.fromEntity(updated);
    }

    @Transactional
    public void delete(String id) {
        // check category
        ProductCategoryEntity categoryToDelete = productCategoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category ID not found"));

        // delete
        productCategoryRepository.delete(categoryToDelete);
    }

}
