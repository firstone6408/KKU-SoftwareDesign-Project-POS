package com.sdp.pos.service.customer.implement;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.dto.customer.CustomerRequestDTO;
import com.sdp.pos.dto.customer.CustomerResponseDTO;
import com.sdp.pos.entity.CustomerEntity;
import com.sdp.pos.repository.CustomerRepository;
import com.sdp.pos.service.customer.contract.CustomerService;
import com.sdp.pos.service.customer.exception.CustomerNotFoundException;

@Service
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CustomerResponseDTO> getAll() {
        List<CustomerEntity> customers = customerRepository.findAllByOrderByCreatedAtDesc();

        return customers.stream().map(CustomerResponseDTO::fromEntitty).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CustomerResponseDTO getById(String id) {
        CustomerEntity customer = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException(id));

        return CustomerResponseDTO.fromEntitty(customer);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CustomerResponseDTO> searchCustomer(String keyword) {
        List<CustomerEntity> customers = customerRepository.searchByNameOrContact(keyword);

        return customers.stream().map(CustomerResponseDTO::fromEntitty).toList();
    }

    @Override
    @Transactional
    public CustomerResponseDTO create(CustomerRequestDTO requestDTO) {
        // create
        CustomerEntity customerToCreate = new CustomerEntity(requestDTO.getName(), requestDTO.getContactInfo());

        // save
        CustomerEntity created = customerRepository.save(customerToCreate);

        return CustomerResponseDTO.fromEntitty(created);
    }

    @Override
    @Transactional
    public CustomerResponseDTO update(String id, CustomerRequestDTO requestDTO) {
        // check customer
        CustomerEntity customerToUpdate = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException(id));

        // update
        customerToUpdate.setName(requestDTO.getName());
        customerToUpdate.setContactInfo(requestDTO.getContactInfo());

        // save
        CustomerEntity updated = customerRepository.save(customerToUpdate);

        return CustomerResponseDTO.fromEntitty(updated);
    }

    @Override
    @Transactional
    public void delete(String id) {
        // check customer
        CustomerEntity customerToDelete = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException(id));

        // delete
        customerRepository.delete(customerToDelete);
    }
}
