package com.sdp.pos.service.productcategory.implement;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.constant.PermissionEnum;
import com.sdp.pos.dto.product.category.ProductCategoryRequestDTO;
import com.sdp.pos.dto.product.category.ProductCategoryResponseDTO;
import com.sdp.pos.entity.ProductCategoryEntity;
import com.sdp.pos.repository.ProductCategoryRepository;
import com.sdp.pos.service.auth.contract.AuthorizationService;
import com.sdp.pos.service.productcategory.contract.ProductCategoryService;
import com.sdp.pos.service.productcategory.exception.CategoryNotFoundException;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;
    private final AuthorizationService authorizationService;

    public ProductCategoryServiceImpl(ProductCategoryRepository productCategoryRepository,
            AuthorizationService authorizationService) {
        this.productCategoryRepository = productCategoryRepository;
        this.authorizationService = authorizationService;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductCategoryResponseDTO> getAll() {
        // check permission
        authorizationService.checkPermission(PermissionEnum.PRODUCT_CATEGORY_VIEW);

        List<ProductCategoryEntity> categories = productCategoryRepository.findAllByOrderByNameAsc();
        return categories.stream().map(ProductCategoryResponseDTO::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProductCategoryResponseDTO getById(String id) {
        // check permission
        authorizationService.checkPermission(PermissionEnum.PRODUCT_CATEGORY_VIEW);

        ProductCategoryEntity category = productCategoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
        return ProductCategoryResponseDTO.fromEntity(category);
    }

    @Override
    @Transactional
    public ProductCategoryResponseDTO create(ProductCategoryRequestDTO requestDTO) {
        // check permission
        authorizationService.checkPermission(PermissionEnum.PRODUCT_CATEGORY_CREATE);

        ProductCategoryEntity categoryEntity = new ProductCategoryEntity(requestDTO.getName());
        ProductCategoryEntity created = productCategoryRepository.save(categoryEntity);
        return ProductCategoryResponseDTO.fromEntity(created);
    }

    @Override
    @Transactional
    public ProductCategoryResponseDTO update(String id, ProductCategoryRequestDTO requestDTO) {
        // check permission
        authorizationService.checkPermission(PermissionEnum.PRODUCT_CATEGORY_UPDATE);

        // check category
        ProductCategoryEntity categoryToUpdate = productCategoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        // update
        categoryToUpdate.setName(requestDTO.getName());

        // save
        ProductCategoryEntity updated = productCategoryRepository.save(categoryToUpdate);

        return ProductCategoryResponseDTO.fromEntity(updated);
    }

    @Override
    @Transactional
    public void delete(String id) {
        // check permission
        authorizationService.checkPermission(PermissionEnum.PRODUCT_CATEGORY_DELETE);

        // check category
        ProductCategoryEntity categoryToDelete = productCategoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        // delete
        productCategoryRepository.delete(categoryToDelete);
    }

}
