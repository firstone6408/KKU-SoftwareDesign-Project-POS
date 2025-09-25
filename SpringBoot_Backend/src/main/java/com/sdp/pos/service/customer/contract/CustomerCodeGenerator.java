package com.sdp.pos.service.customer.contract;

public interface CustomerCodeGenerator {
    /**
     * Generates a unique customer code in the format "CUST-XXXXXX".
     * 
     * The numeric part uses 6 digits and is stored as an int internally.
     * This ensures sequential generation without storing the entire string in
     * memory.
     * 
     * Example sequence:
     * - First customer: CUST-000001
     * - Second customer: CUST-000002
     * - Tenth customer: CUST-000010
     * 
     * Note:
     * - The number part is incremented based on the last existing customer in the
     * database.
     * - Using int limits the maximum number to 2,147,483,647 (which is more than
     * enough for 6-digit codes).
     *
     * @return A new unique customer code string
     */
    String generate();
}
