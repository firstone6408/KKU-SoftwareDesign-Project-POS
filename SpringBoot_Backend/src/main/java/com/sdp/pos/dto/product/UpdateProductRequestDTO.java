package com.sdp.pos.dto.product;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateProductRequestDTO {
    @NotBlank(message = "name is required")
    @Size(min = 2)
    private final String name;

    @NotBlank(message = "barcode is required")
    @Size(min = 13, max = 13)
    private final String barcode;

    private final MultipartFile imageFile;

    @NotBlank(message = "categoryId is required")
    private final String categoryId;

    @NotBlank(message = "supplierId is required")
    private final String supplierId;

    private final String description;

}
