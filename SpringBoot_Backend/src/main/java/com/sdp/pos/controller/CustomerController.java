package com.sdp.pos.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdp.pos.dto.customer.CustomerRequestDTO;
import com.sdp.pos.service.contract.CustomerService;
import com.sdp.pos.util.ApiResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public ResponseEntity<?> getCustomerList() {
        return ApiResponse.success(customerService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable String id) {
        return ApiResponse.success(customerService.getById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<?> getCustomerBySearch(@RequestParam String keyward) {
        return ApiResponse.success(customerService.searchCustomer(keyward));
    }

    @PostMapping
    public ResponseEntity<?> createCustomer(@RequestBody CustomerRequestDTO requestDTO) {
        return ApiResponse.success(HttpStatus.CREATED, "Customer created success", customerService.create(requestDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable String id, @RequestBody CustomerRequestDTO requestDTO) {
        return ApiResponse.success("Customer updated success", customerService.update(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomerr(@PathVariable String id) {
        customerService.delete(id);
        return ApiResponse.success("Customer deleted success");
    }

}
