package com.sdp.pos.constant;

public enum OrderStatusEnum {
    PENDING, // รอการชำระเงิน
    PAID, // ชำระแล้ว
    COMPLETED, // เสร็จสิ้น (ปิดออเดอร์เรียบร้อย)
    CANCELLED, // ยกเลิก
}
