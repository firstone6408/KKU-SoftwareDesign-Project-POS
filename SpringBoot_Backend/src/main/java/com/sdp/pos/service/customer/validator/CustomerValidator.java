package com.sdp.pos.service.customer.validator;

import org.springframework.stereotype.Component;

import com.sdp.pos.entity.CustomerEntity;
import com.sdp.pos.repository.CustomerRepository;
import com.sdp.pos.service.customer.exception.CustomerNotFoundException;

@Component
public class CustomerValidator {
    private final CustomerRepository customerRepository;

    public CustomerValidator(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public CustomerEntity validateCustomerExists(String customerId) {
        CustomerEntity customer = customerRepository.findById(customerId).orElseThrow(
                () -> new CustomerNotFoundException(customerId));

        return customer;
    }
}
