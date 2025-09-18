package com.sdp.pos.dto.supplier;

import com.sdp.pos.entity.SupplierEntity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SupplierResponseDTO {
    private final String id;
    private final String name;
    private final String contactInfo;

    public SupplierResponseDTO(String id, String name, String contactInfo) {
        this.id = id;
        this.name = name;
        this.contactInfo = contactInfo;
    }

    public static SupplierResponseDTO fromEntity(SupplierEntity supplier) {
        return new SupplierResponseDTO(supplier.getId(), supplier.getName(), supplier.getContactInfo());
    }

}
