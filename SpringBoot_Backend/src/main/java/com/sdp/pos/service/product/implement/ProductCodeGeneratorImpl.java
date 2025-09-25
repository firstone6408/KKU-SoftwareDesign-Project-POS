package com.sdp.pos.service.product.implement;

import org.springframework.stereotype.Component;

import com.sdp.pos.entity.ProductEntity;
import com.sdp.pos.repository.ProductRepository;
import com.sdp.pos.service.product.contract.ProductCodeGenerator;
import com.sdp.pos.service.product.exception.ProductCodeGenerationException;

@Component
public class ProductCodeGeneratorImpl implements ProductCodeGenerator {

    private final ProductRepository productRepository;

    public ProductCodeGeneratorImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public String generate() {
        try {
            // หาเลขล่าสุดจาก DB
            ProductEntity lastProduct = productRepository
                    .findFirstByOrderByCreatedAtDesc();

            int nextNumber = 1;

            if (lastProduct != null && lastProduct.getProductCode() != null) {
                String code = lastProduct.getProductCode();

                if (code.startsWith("PROD-")) {
                    try {
                        int lastNumber = Integer.parseInt(code.substring(5));
                        nextNumber = lastNumber + 1;
                    } catch (Exception e) {
                        // ถ้า parse ไม่ได้ ให้เริ่มที่ 1
                        nextNumber = 1;
                    }
                }
            }

            return String.format("PROD-%06d", nextNumber);
        } catch (Exception e) {
            throw new ProductCodeGenerationException(e.getMessage());
        }
    }

}
