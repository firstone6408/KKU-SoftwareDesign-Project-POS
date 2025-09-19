package com.sdp.pos.service.contract;

import java.util.List;

import com.sdp.pos.dto.customer.CustomerRequestDTO;
import com.sdp.pos.dto.customer.CustomerResponseDTO;

public interface CustomerService {
    List<CustomerResponseDTO> getAll();

    CustomerResponseDTO getById(String id);

    List<CustomerResponseDTO> searchCustomer(String keyword);

    CustomerResponseDTO create(CustomerRequestDTO requestDTO);

    CustomerResponseDTO update(String id, CustomerRequestDTO requestDTO);

    void delete(String id);

}
