package com.sdp.pos.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdp.pos.dto.supplier.SupplierRequestDTO;
import com.sdp.pos.service.supplier.contract.SupplierService;
import com.sdp.pos.util.ApiResponse;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {
    private final SupplierService supplierService;

    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @GetMapping
    public ResponseEntity<?> getSupplierList() {
        return ApiResponse.success(supplierService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSupplierById(@PathVariable String id) {
        return ApiResponse.success(supplierService.getById(id));
    }

    @PostMapping
    public ResponseEntity<?> createSupplier(@Valid @RequestBody SupplierRequestDTO requestDTO) {
        return ApiResponse.success(HttpStatus.CREATED, "Supplier created success", supplierService.create(requestDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSupplier(@PathVariable String id,
            @Valid @RequestBody SupplierRequestDTO requestDTO) {
        return ApiResponse.success("Supplier updated success", supplierService.update(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSupplier(@PathVariable String id) {
        supplierService.delete(id);
        return ApiResponse.success("Supplier deleted success");
    }
}
