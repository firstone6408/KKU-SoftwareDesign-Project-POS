export enum OrderStatusEnum {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  PAID = "PAID",
  COMPLETED = "COMPLETED", // เสร็จสิ้น (ปิดออเดอร์เรียบร้อย)
}

export enum OrderPaymentMethodEnum {
  CASH = "CASH", // เงินสด
  CREDIT_CARD = "CREDIT_CARD", // บัตรเครดิต / เดบิต
  BANK_TRANSFER = "BANK_TRANSFER", // โอนผ่านธนาคาร
  E_WALLET = "E_WALLET", // e-wallet เช่น TrueMoney, Rabbit LinePay
}
