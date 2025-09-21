package com.sdp.pos.service.product.implement;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.dto.product.AdjustStockProductRequestDTO;
import com.sdp.pos.dto.product.ProductRequestDTO;
import com.sdp.pos.dto.product.ProductResponseDTO;
import com.sdp.pos.dto.product.UpdateProductRequestDTO;
import com.sdp.pos.entity.ProductCategoryEntity;
import com.sdp.pos.entity.ProductEntity;
import com.sdp.pos.entity.SupplierEntity;
import com.sdp.pos.repository.ProductRepository;
import com.sdp.pos.service.product.contract.ProductService;
import com.sdp.pos.service.product.exception.ProductNotFoundException;
import com.sdp.pos.service.product.validator.ProductValidator;
import com.sdp.pos.util.ImageFileHandler;

@Service
public class ProductServiceImpl implements ProductService {
        private final ProductRepository productRepository;
        private final ProductValidator productValidator;
        private final ImageFileHandler imageFileHandler = new ImageFileHandler("products");

        public ProductServiceImpl(ProductRepository productRepository, ProductValidator productValidator) {
                this.productRepository = productRepository;
                this.productValidator = productValidator;
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
                ProductEntity product = productRepository.findById(id)
                                .orElseThrow(() -> new ProductNotFoundException(id));

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
                productToCreate.setDescription(requestDTO.getDescription());
                productToCreate.setUnitPrice(requestDTO.getUnitPrice());
                productToCreate.setStockLevel(requestDTO.getStockLevel());
                productToCreate.setCategory(category);
                productToCreate.setSupplier(supplier);

                // save image
                if (requestDTO.getImageFile() != null) {
                        String path = imageFileHandler.uploadFile(requestDTO.getImageFile());
                        productToCreate.setImageUrl(path);
                }

                // save
                ProductEntity created = productRepository.save(productToCreate);

                return ProductResponseDTO.fromEntity(created);
        }

        @Override
        @Transactional
        public ProductResponseDTO update(String id, UpdateProductRequestDTO requestDTO) {
                ProductEntity productToUpdate = productRepository.findById(id)
                                .orElseThrow(() -> new ProductNotFoundException(id));

                // validate category and supplier
                ProductCategoryEntity category = productValidator.validateCategory(requestDTO.getCategoryId());
                SupplierEntity supplier = productValidator.validateSupplier(requestDTO.getSupplierId());

                // update
                productToUpdate.setName(requestDTO.getName());
                productToUpdate.setDescription(requestDTO.getDescription());
                productToUpdate.setUnitPrice(requestDTO.getUnitPrice());
                productToUpdate.setCategory(category);
                productToUpdate.setSupplier(supplier);

                // update image
                if (requestDTO.getImageFile() != null) {
                        String path = imageFileHandler.replaceFile(productToUpdate.getImageUrl(),
                                        requestDTO.getImageFile());
                        productToUpdate.setImageUrl(path);
                }

                // save
                ProductEntity updated = productRepository.save(productToUpdate);

                return ProductResponseDTO.fromEntity(updated);
        }

        @Override
        @Transactional
        public void delete(String id) {
                ProductEntity productToDelete = productRepository.findById(id)
                                .orElseThrow(() -> new ProductNotFoundException(id));

                // delete image
                imageFileHandler.deleteFile(productToDelete.getImageUrl());

                // delete
                productRepository.delete(productToDelete);
        }

        @Override
        @Transactional
        public void adjustStock(String productId, AdjustStockProductRequestDTO requestDTO) {
                // check product
                ProductEntity productToAdjust = productRepository.findById(productId)
                                .orElseThrow(() -> new ProductNotFoundException(productId));

                // adjust
                requestDTO.getAdjustStockType().apply(productToAdjust, requestDTO.getQuantity());

                // save
                productRepository.save(productToAdjust);
        }
}
