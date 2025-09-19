package com.sdp.pos.service.implement;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.dto.supplier.SupplierRequestDTO;
import com.sdp.pos.dto.supplier.SupplierResponseDTO;
import com.sdp.pos.entity.SupplierEntity;
import com.sdp.pos.repository.SupplierRepository;
import com.sdp.pos.service.contract.SupplierService;
import com.sdp.pos.service.exception.supplier.SupplierNotFoundException;

@Service
public class SupplierServiceImpl implements SupplierService {
    public final SupplierRepository supplierRepository;

    public SupplierServiceImpl(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<SupplierResponseDTO> getAll() {
        List<SupplierEntity> suppliers = supplierRepository.findAll();

        return suppliers.stream().map(SupplierResponseDTO::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public SupplierResponseDTO getById(String id) {
        SupplierEntity supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new SupplierNotFoundException(id));

        return SupplierResponseDTO.fromEntity(supplier);
    }

    @Override
    @Transactional
    public SupplierResponseDTO create(SupplierRequestDTO requestDTO) {
        SupplierEntity supplier = new SupplierEntity(requestDTO.getName(), requestDTO.getContactInfo());
        SupplierEntity created = supplierRepository.save(supplier);

        return SupplierResponseDTO.fromEntity(created);
    }

    @Override
    @Transactional
    public SupplierResponseDTO update(String id, SupplierRequestDTO requestDTO) {
        // check supplier
        SupplierEntity supplierToUpdate = supplierRepository.findById(id)
                .orElseThrow(() -> new SupplierNotFoundException(id));

        // update
        supplierToUpdate.setName(requestDTO.getName());
        supplierToUpdate.setContactInfo(requestDTO.getContactInfo());

        // save
        SupplierEntity updated = supplierRepository.save(supplierToUpdate);

        return SupplierResponseDTO.fromEntity(updated);

    }

    @Override
    @Transactional
    public void delete(String id) {
        // check supplier
        SupplierEntity supplierToDelete = supplierRepository.findById(id)
                .orElseThrow(() -> new SupplierNotFoundException(id));

        // delete
        supplierRepository.delete(supplierToDelete);
    }
}
