package com.sdp.pos.service.supplier.implement;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.constant.PermissionEnum;
import com.sdp.pos.dto.supplier.SupplierRequestDTO;
import com.sdp.pos.dto.supplier.SupplierResponseDTO;
import com.sdp.pos.entity.SupplierEntity;
import com.sdp.pos.repository.SupplierRepository;
import com.sdp.pos.service.auth.contract.AuthorizationService;
import com.sdp.pos.service.supplier.contract.SupplierService;
import com.sdp.pos.service.supplier.exception.SupplierNotFoundException;

@Service
public class SupplierServiceImpl implements SupplierService {
    public final SupplierRepository supplierRepository;
    private final AuthorizationService authorizationService;

    public SupplierServiceImpl(SupplierRepository supplierRepository, AuthorizationService authorizationService) {
        this.supplierRepository = supplierRepository;
        this.authorizationService = authorizationService;
    }

    @Override
    @Transactional(readOnly = true)
    public List<SupplierResponseDTO> getAll() {
        // check permission
        authorizationService.checkPermission(PermissionEnum.SUPPLIER_VIEW);

        List<SupplierEntity> suppliers = supplierRepository.findAllByOrderByNameAsc();

        return suppliers.stream().map(SupplierResponseDTO::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public SupplierResponseDTO getById(String id) {
        // check permission
        authorizationService.checkPermission(PermissionEnum.SUPPLIER_VIEW);

        SupplierEntity supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new SupplierNotFoundException(id));

        return SupplierResponseDTO.fromEntity(supplier);
    }

    @Override
    @Transactional
    public SupplierResponseDTO create(SupplierRequestDTO requestDTO) {
        // check permission
        authorizationService.checkPermission(PermissionEnum.SUPPLIER_CREATE);

        SupplierEntity supplier = new SupplierEntity(requestDTO.getName(), requestDTO.getContactInfo());
        SupplierEntity created = supplierRepository.save(supplier);

        return SupplierResponseDTO.fromEntity(created);
    }

    @Override
    @Transactional
    public SupplierResponseDTO update(String id, SupplierRequestDTO requestDTO) {
        // check permission
        authorizationService.checkPermission(PermissionEnum.SUPPLIER_UPDATE);

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
        // check permission
        authorizationService.checkPermission(PermissionEnum.SUPPLIER_DELETE);

        // check supplier
        SupplierEntity supplierToDelete = supplierRepository.findById(id)
                .orElseThrow(() -> new SupplierNotFoundException(id));

        // delete
        supplierRepository.delete(supplierToDelete);
    }
}
