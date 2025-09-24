package com.sdp.pos.dto.product;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateProductRequestDTO {
    @NotBlank(message = "name is required")
    private final String name;

    private final MultipartFile imageFile;

    @NotBlank(message = "categoryId is required")
    private final String categoryId;

    @NotBlank(message = "supplierId is required")
    private final String supplierId;

    private final String description;

}
