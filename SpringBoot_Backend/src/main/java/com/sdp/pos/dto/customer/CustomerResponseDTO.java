package com.sdp.pos.dto.customer;

import java.time.LocalDateTime;

import com.sdp.pos.entity.CustomerEntity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CustomerResponseDTO {
    private final String id;

    private final String name;

    private final String contactInfo;

    private final LocalDateTime createdAt;

    private final LocalDateTime updatedAt;

    public static CustomerResponseDTO fromEntitty(CustomerEntity customer) {
        return new CustomerResponseDTO(customer.getId(), customer.getName(), customer.getContactInfo(),
                customer.getCreatedAt(), customer.getUpdatedAt());
    }
}
