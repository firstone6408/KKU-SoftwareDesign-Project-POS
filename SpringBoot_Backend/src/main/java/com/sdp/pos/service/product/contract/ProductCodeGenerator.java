package com.sdp.pos.service.product.contract;

public interface ProductCodeGenerator {
    /**
     * Generates a new product code in the format "PROD-XXXXX", where "XXXXX" is
     * a zero-padded number starting from 00001.
     *
     * <p>
     * The numbering is maintained by an internal counter that is initialized
     * based on the latest product in the database. Each call to this method
     * increments the counter to ensure unique codes for new products within
     * this application instance.
     * </p>
     *
     * <p>
     * Example usage:
     * </p>
     * 
     * <pre>
     * ProductCodeGenerator generator = new ProductCodeGeneratorImpl(productRepository);
     * String code = generator.generate(); // "PROD-000001"
     * String nextCode = generator.generate(); // "PROD-000002"
     * </pre>
     *
     * @return a unique product code as a String in the "PROD-XXXXXX" format
     */
    String generate();
}
