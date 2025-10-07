package com.sdp.pos.service.product.implement;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.dto.cloud.CloudFileResultDTO;
import com.sdp.pos.dto.product.AdjustStockProductRequestDTO;
import com.sdp.pos.dto.product.AdjustUnitPriceProductRequestDTO;
import com.sdp.pos.dto.product.ProductRequestDTO;
import com.sdp.pos.dto.product.ProductResponseDTO;
import com.sdp.pos.dto.product.UpdateProductRequestDTO;
import com.sdp.pos.entity.ProductCategoryEntity;
import com.sdp.pos.entity.ProductEntity;
import com.sdp.pos.entity.SupplierEntity;
import com.sdp.pos.repository.ProductRepository;
import com.sdp.pos.service.file.contract.CloudFileService;
import com.sdp.pos.service.product.contract.ProductCodeGenerator;
import com.sdp.pos.service.product.contract.ProductService;
import com.sdp.pos.service.product.validator.ProductValidator;

@Service
public class ProductServiceImpl implements ProductService {
        private final ProductRepository productRepository;
        private final ProductValidator productValidator;
        private final ProductCodeGenerator productCodeGenerator;
        private final CloudFileService cloudFileService;;

        public ProductServiceImpl(ProductRepository productRepository, ProductValidator productValidator,
                        ProductCodeGenerator productCodeGenerator, CloudFileService cloudFileService) {
                this.productRepository = productRepository;
                this.productValidator = productValidator;
                this.productCodeGenerator = productCodeGenerator;
                this.cloudFileService = cloudFileService;
        }

        @Override
        @Transactional(readOnly = true)
        public List<ProductResponseDTO> getAll() {
                List<ProductEntity> products = productRepository.findAllByOrderByCreatedAtDesc();

                return products.stream().map(ProductResponseDTO::fromEntity).toList();
        }

        @Override
        @Transactional(readOnly = true)
        public ProductResponseDTO getById(String id) {
                ProductEntity product = productValidator.validateProductExists(id);

                return ProductResponseDTO.fromEntity(product);
        }

        @Override
        @Transactional
        public ProductResponseDTO create(ProductRequestDTO requestDTO) {
                // validate category and supplier
                ProductCategoryEntity category = productValidator.validateCategory(requestDTO.getCategoryId());
                SupplierEntity supplier = productValidator.validateSupplier(requestDTO.getSupplierId());

                // create
                ProductEntity productToCreate = new ProductEntity();
                productToCreate.setName(requestDTO.getName());
                productToCreate.setProductCode(productCodeGenerator.generate());
                productToCreate.setBarcode(requestDTO.getBarcode());
                productToCreate.setDescription(requestDTO.getDescription());
                productToCreate.setUnitPrice(requestDTO.getUnitPrice());
                productToCreate.setStockLevel(requestDTO.getStockLevel());
                productToCreate.setCategory(category);
                productToCreate.setSupplier(supplier);

                // save image
                if (requestDTO.getImageFile() != null) {
                        // upload image to ImageKit
                        CloudFileResultDTO result = cloudFileService.uploadFile(requestDTO.getImageFile());
                        productToCreate.setImageId(result.getFileId());
                        productToCreate.setImageUrl(result.getUrl());
                }

                // save
                ProductEntity created = productRepository.save(productToCreate);

                return ProductResponseDTO.fromEntity(created);
        }

        @Override
        @Transactional
        public ProductResponseDTO update(String id, UpdateProductRequestDTO requestDTO) {
                ProductEntity productToUpdate = productValidator.validateProductExists(id);

                // validate category and supplier
                ProductCategoryEntity category = productValidator.validateCategory(requestDTO.getCategoryId());
                SupplierEntity supplier = productValidator.validateSupplier(requestDTO.getSupplierId());

                // update
                productToUpdate.setName(requestDTO.getName());
                productToUpdate.setBarcode(requestDTO.getBarcode());
                productToUpdate.setDescription(requestDTO.getDescription());
                productToUpdate.setCategory(category);
                productToUpdate.setSupplier(supplier);

                // update image
                if (requestDTO.getImageFile() != null) {
                        // delete old image
                        cloudFileService.deleteFile(productToUpdate.getImageId());

                        // upload new image
                        CloudFileResultDTO result = cloudFileService.replaceFile(productToUpdate.getImageUrl(),
                                        requestDTO.getImageFile());
                        productToUpdate.setImageId(result.getFileId());
                        productToUpdate.setImageUrl(result.getUrl());
                }

                // save
                ProductEntity updated = productRepository.save(productToUpdate);

                return ProductResponseDTO.fromEntity(updated);
        }

        @Override
        @Transactional
        public void delete(String id) {
                ProductEntity productToDelete = productValidator.validateProductExists(id);

                // delete image
                cloudFileService.deleteFile(productToDelete.getImageId());

                // delete
                productRepository.delete(productToDelete);
        }

        @Override
        @Transactional
        public void adjustStock(String productId, AdjustStockProductRequestDTO requestDTO) {
                // check product
                ProductEntity productToAdjust = productValidator.validateProductExists(productId);

                // adjust
                requestDTO.getAdjustStockType().apply(productToAdjust, requestDTO.getQuantity());

                // save
                productRepository.save(productToAdjust);
        }

        @Override
        @Transactional
        public void adjustUnitPrice(String productId, AdjustUnitPriceProductRequestDTO requestDTO) {
                // check product
                ProductEntity productToAdjust = productValidator.validateProductExists(productId);

                // adjust
                productToAdjust.setUnitPrice(requestDTO.getUnitPrice());

                // save
                productRepository.save(productToAdjust);
        }
}
