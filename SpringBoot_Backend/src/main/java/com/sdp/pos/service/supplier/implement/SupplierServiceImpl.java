package com.sdp.pos.service.supplier.implement;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.dto.supplier.SupplierRequestDTO;
import com.sdp.pos.dto.supplier.SupplierResponseDTO;
import com.sdp.pos.entity.SupplierEntity;
import com.sdp.pos.repository.SupplierRepository;
import com.sdp.pos.service.supplier.contract.SupplierService;
import com.sdp.pos.service.supplier.validator.SupplierValidator;

@Service
public class SupplierServiceImpl implements SupplierService {
    public final SupplierRepository supplierRepository;
    private final SupplierValidator supplierValidator;

    public SupplierServiceImpl(SupplierRepository supplierRepository,
            SupplierValidator supplierValidator) {
        this.supplierRepository = supplierRepository;
        this.supplierValidator = supplierValidator;
    }

    @Override
    @Transactional(readOnly = true)
    public List<SupplierResponseDTO> getAll() {
        List<SupplierEntity> suppliers = supplierRepository.findAllByOrderByNameAsc();

        return suppliers.stream().map(SupplierResponseDTO::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public SupplierResponseDTO getById(String id) {
        SupplierEntity supplier = supplierValidator.validateSupplierExists(id);

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
        SupplierEntity supplierToUpdate = supplierValidator.validateSupplierExists(id);

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
        SupplierEntity supplierToDelete = supplierValidator.validateSupplierExists(id);

        // delete
        supplierRepository.delete(supplierToDelete);
    }
}
