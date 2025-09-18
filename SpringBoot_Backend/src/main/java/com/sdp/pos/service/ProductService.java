package com.sdp.pos.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.sdp.pos.dto.product.ProductRequestDTO;
import com.sdp.pos.dto.product.ProductResponseDTO;
import com.sdp.pos.entity.ProductCategoryEntity;
import com.sdp.pos.entity.ProductEntity;
import com.sdp.pos.entity.SupplierEntity;
import com.sdp.pos.repository.ProductCategoryRepository;
import com.sdp.pos.repository.ProductRepository;
import com.sdp.pos.repository.SupplierRepository;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final SupplierRepository supplierRepository;

    public ProductService(ProductRepository productRepository, ProductCategoryRepository productCategoryRepository,
            SupplierRepository supplierRepository) {
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.supplierRepository = supplierRepository;
    }

    @Transactional(readOnly = true)
    public List<ProductResponseDTO> getAll() {
        List<ProductEntity> products = productRepository.findAll();

        return products.stream().map(ProductResponseDTO::fromEntity).toList();
    }

    @Transactional(readOnly = true)
    public ProductResponseDTO getById(String id) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product ID not found"));

        return ProductResponseDTO.fromEntity(product);
    }

    @Transactional
    public ProductResponseDTO create(ProductRequestDTO requestDTO) {
        // check category and supplier
        ProductCategoryEntity category = productCategoryRepository.findById(requestDTO.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category ID not found"));
        SupplierEntity supplier = supplierRepository.findById(requestDTO.getSupplierId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Supplier ID not found"));

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

    @Transactional
    public ProductResponseDTO update(String id, ProductRequestDTO requestDTO) {
        ProductEntity productToUpdate = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product ID not found"));

        // check category and supplier
        ProductCategoryEntity category = productCategoryRepository.findById(requestDTO.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category ID not found"));
        SupplierEntity supplier = supplierRepository.findById(requestDTO.getSupplierId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Supplier ID not found"));

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

    @Transactional
    public void delete(String id) {
        ProductEntity productToDelete = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product ID not found"));

        // delete
        productRepository.delete(productToDelete);
    }
}
