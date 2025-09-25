package com.sdp.pos.service.order.contract;

public interface OrderCodeGenerator {
    /**
     * Implementation of {@link OrderCodeGenerator} for generating new order codes.
     * The order code format is "ORD-XXXXXX", where XXXXXX is a 6-digit number
     * that increments based on the latest order in the database.
     * <p>
     * Examples:
     * <ul>
     * <li>ORD-000001</li>
     * <li>ORD-000002</li>
     * <li>ORD-000010</li>
     * </ul>
     * <p>
     * Logic:
     * <ol>
     * <li>Retrieve the latest order from the database, ordered by order date.</li>
     * <li>Extract the numeric part from the order code (substring after
     * "ORD-").</li>
     * <li>Increment the number by 1 for the new order code.</li>
     * <li>If parsing fails or there is no order, start from 1.</li>
     * </ol>
     * <p>
     * Note: Calling generate multiple times concurrently may cause race conditions.
     * To prevent duplicates, consider using a database sequence or locking
     * mechanism.
     */
    String generate();
}
