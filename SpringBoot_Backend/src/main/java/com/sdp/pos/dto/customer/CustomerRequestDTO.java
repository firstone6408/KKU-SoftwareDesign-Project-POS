package com.sdp.pos.dto.customer;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CustomerRequestDTO {
    @NotBlank(message = "name is requird")
    @Size(min = 2)
    private final String name;

    private final String contactInfo;
}
