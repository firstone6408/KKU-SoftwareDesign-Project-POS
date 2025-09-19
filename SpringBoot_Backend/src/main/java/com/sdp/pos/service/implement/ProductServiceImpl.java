package com.sdp.pos.service.implement;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.dto.product.ProductRequestDTO;
import com.sdp.pos.dto.product.ProductResponseDTO;
import com.sdp.pos.entity.ProductCategoryEntity;
import com.sdp.pos.entity.ProductEntity;
import com.sdp.pos.entity.SupplierEntity;
import com.sdp.pos.repository.ProductRepository;
import com.sdp.pos.service.contract.ProductService;
import com.sdp.pos.service.exception.product.ProductNotFoundException;
import com.sdp.pos.service.validator.ProductValidator;

@Service
public class ProductServiceImpl implements ProductService {
        private final ProductRepository productRepository;
        private final ProductValidator productValidator;

        public ProductServiceImpl(ProductRepository productRepository, ProductValidator productValidator) {
                this.productRepository = productRepository;
                this.productValidator = productValidator;
        }

        @Override
        @Transactional(readOnly = true)
        public List<ProductResponseDTO> getAll() {
                List<ProductEntity> products = productRepository.findAll();

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

                // save
                ProductEntity created = productRepository.save(productToCreate);

                return ProductResponseDTO.fromEntity(created);
        }

        @Override
        @Transactional
        public ProductResponseDTO update(String id, ProductRequestDTO requestDTO) {
                ProductEntity productToUpdate = productRepository.findById(id)
                                .orElseThrow(() -> new ProductNotFoundException(id));

                // validate category and supplier
                ProductCategoryEntity category = productValidator.validateCategory(requestDTO.getCategoryId());
                SupplierEntity supplier = productValidator.validateSupplier(requestDTO.getSupplierId());

                // update
                productToUpdate.setName(requestDTO.getName());
                productToUpdate.setDescription(requestDTO.getDescription());
                productToUpdate.setUnitPrice(requestDTO.getUnitPrice());
                productToUpdate.setStockLevel(requestDTO.getStockLevel());
                productToUpdate.setCategory(category);
                productToUpdate.setSupplier(supplier);

                // save
                ProductEntity updated = productRepository.save(productToUpdate);

                return ProductResponseDTO.fromEntity(updated);
        }

        @Override
        @Transactional
        public void delete(String id) {
                ProductEntity productToDelete = productRepository.findById(id)
                                .orElseThrow(() -> new ProductNotFoundException(id));

                // delete
                productRepository.delete(productToDelete);
        }
}
