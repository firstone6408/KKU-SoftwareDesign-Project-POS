package com.sdp.pos.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.sdp.pos.dto.supplier.SupplierRequestDTO;
import com.sdp.pos.dto.supplier.SupplierResponseDTO;
import com.sdp.pos.entity.SupplierEntity;
import com.sdp.pos.repository.SupplierRepository;

@Service
public class SupplierService {
    public final SupplierRepository supplierRepository;

    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @Transactional(readOnly = true)
    public List<SupplierResponseDTO> getAll() {
        List<SupplierEntity> suppliers = supplierRepository.findAll();

        return suppliers.stream().map(SupplierResponseDTO::fromEntity).toList();
    }

    @Transactional(readOnly = true)
    public SupplierResponseDTO getById(String id) {
        SupplierEntity supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Supplier ID not found"));

        return SupplierResponseDTO.fromEntity(supplier);
    }

    @Transactional
    public SupplierResponseDTO create(SupplierRequestDTO requestDTO) {
        SupplierEntity supplier = new SupplierEntity(requestDTO.getName(), requestDTO.getContactInfo());
        SupplierEntity created = supplierRepository.save(supplier);

        return SupplierResponseDTO.fromEntity(created);
    }

    @Transactional
    public SupplierResponseDTO update(String id, SupplierRequestDTO requestDTO) {
        // check supplier
        SupplierEntity supplierToUpdate = supplierRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Supplier ID not found"));

        // update
        supplierToUpdate.setName(requestDTO.getName());
        supplierToUpdate.setContactInfo(requestDTO.getContactInfo());

        // save
        SupplierEntity updated = supplierRepository.save(supplierToUpdate);

        return SupplierResponseDTO.fromEntity(updated);

    }

    @Transactional
    public void delete(String id) {
        // check supplier
        SupplierEntity supplierToDelete = supplierRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Supplier ID not found"));

        // delete
        supplierRepository.delete(supplierToDelete);
    }
}
