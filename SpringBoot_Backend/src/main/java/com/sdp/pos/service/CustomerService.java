package com.sdp.pos.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.sdp.pos.dto.customer.CustomerRequestDTO;
import com.sdp.pos.dto.customer.CustomerResponseDTO;
import com.sdp.pos.entity.CustomerEntity;
import com.sdp.pos.repository.CustomerRepository;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Transactional(readOnly = true)
    public List<CustomerResponseDTO> getAll() {
        List<CustomerEntity> customers = customerRepository.findAll();

        return customers.stream().map(CustomerResponseDTO::fromEntitty).toList();
    }

    @Transactional(readOnly = true)
    public CustomerResponseDTO getById(String id) {
        CustomerEntity customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer ID not found"));

        return CustomerResponseDTO.fromEntitty(customer);
    }

    @Transactional(readOnly = true)
    public List<CustomerResponseDTO> searchCustomer(String keyword) {
        List<CustomerEntity> customers = customerRepository.searchByNameOrContact(keyword);

        return customers.stream().map(CustomerResponseDTO::fromEntitty).toList();
    }

    @Transactional
    public CustomerResponseDTO create(CustomerRequestDTO requestDTO) {
        // create
        CustomerEntity customerToCreate = new CustomerEntity(requestDTO.getName(), requestDTO.getContactInfo());

        // save
        CustomerEntity created = customerRepository.save(customerToCreate);

        return CustomerResponseDTO.fromEntitty(created);
    }

    @Transactional
    public CustomerResponseDTO update(String id, CustomerRequestDTO requestDTO) {
        // check customer
        CustomerEntity customerToUpdate = customerRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer ID not found"));

        // update
        customerToUpdate.setName(requestDTO.getName());
        customerToUpdate.setContactInfo(requestDTO.getContactInfo());

        // save
        CustomerEntity updated = customerRepository.save(customerToUpdate);

        return CustomerResponseDTO.fromEntitty(updated);
    }

    @Transactional
    public void delete(String id) {
        // check customer
        CustomerEntity customerToDelete = customerRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer ID not found"));

        // delete
        customerRepository.delete(customerToDelete);
    }
}
