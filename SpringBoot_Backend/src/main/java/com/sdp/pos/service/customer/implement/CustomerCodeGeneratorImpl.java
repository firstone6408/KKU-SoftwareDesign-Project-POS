package com.sdp.pos.service.customer.implement;

import org.springframework.stereotype.Component;

import com.sdp.pos.entity.CustomerEntity;
import com.sdp.pos.repository.CustomerRepository;
import com.sdp.pos.service.customer.contract.CustomerCodeGenerator;
import com.sdp.pos.service.customer.exception.CustomerCodeGenerationException;

@Component
public class CustomerCodeGeneratorImpl implements CustomerCodeGenerator {
    private final CustomerRepository customerRepository;

    public CustomerCodeGeneratorImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public String generate() {
        try {
            // หาเลขล่าสุดจาก DB
            CustomerEntity lastCustomer = customerRepository
                    .findFirstByOrderByCreatedAtDesc();

            int nextNumber = 1;

            if (lastCustomer != null && lastCustomer.getCustomerCode() != null) {
                String code = lastCustomer.getCustomerCode();

                if (code.startsWith("CUST-")) {
                    try {
                        int lastNumber = Integer.parseInt(code.substring(5));
                        nextNumber = lastNumber + 1;
                    } catch (Exception e) {
                        // ถ้า parse ไม่ได้ ให้เริ่มที่ 1
                        nextNumber = 1;
                    }
                }
            }

            return String.format("CUST-%06d", nextNumber);
        } catch (Exception e) {
            throw new CustomerCodeGenerationException(e.getMessage());
        }
    }

}
