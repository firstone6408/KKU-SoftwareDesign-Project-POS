package com.sdp.pos.service.supplier.contract;

import java.util.List;

import com.sdp.pos.dto.supplier.SupplierRequestDTO;
import com.sdp.pos.dto.supplier.SupplierResponseDTO;

public interface SupplierService {
    List<SupplierResponseDTO> getAll();

    SupplierResponseDTO getById(String id);

    SupplierResponseDTO create(SupplierRequestDTO requestDTO);

    SupplierResponseDTO update(String id, SupplierRequestDTO requestDTO);

    void delete(String id);
}
