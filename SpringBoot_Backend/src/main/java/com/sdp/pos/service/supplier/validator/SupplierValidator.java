package com.sdp.pos.service.supplier.validator;

import org.springframework.stereotype.Component;

import com.sdp.pos.entity.SupplierEntity;
import com.sdp.pos.repository.SupplierRepository;
import com.sdp.pos.service.supplier.exception.SupplierNotFoundException;

@Component
public class SupplierValidator {
    private final SupplierRepository supplierRepository;

    public SupplierValidator(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public SupplierEntity validateSupplierExists(String supplierId) {
        SupplierEntity supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new SupplierNotFoundException(supplierId));
        return supplier;
    }
}
