package com.sdp.pos.dto.supplier;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupplierRequestDTO {
    @NotBlank(message = "name is required")
    @Size(min = 2)
    private String name;

    @NotBlank(message = "Contact information is required")
    private String contactInfo;

    public SupplierRequestDTO(String name, String contactInfo) {
        this.name = name;
        this.contactInfo = contactInfo;
    }

}
