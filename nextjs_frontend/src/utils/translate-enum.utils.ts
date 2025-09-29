import {
  OrderPaymentMethodEnum,
  OrderStatusEnum,
} from "@/features/orders/services/order.enum";
import { AdjustStockProductEnum } from "@/features/products/services/product.enum";
import { UserRoleEnum } from "@/features/users/services/user.enum";

export const TransaleEnumUtil = {
  adjustStockProduct: function (value: AdjustStockProductEnum) {
    switch (value) {
      case AdjustStockProductEnum.INCREASE:
        return "เพิ่มสินค้า";
      case AdjustStockProductEnum.DECREASE:
        return "ลดสินค้า";
      default:
        return value;
    }
  },
  orderPaymentMethod: function (value: OrderPaymentMethodEnum) {
    switch (value) {
      case OrderPaymentMethodEnum.CASH:
        return "เงินสด";
      case OrderPaymentMethodEnum.CREDIT_CARD:
        return "บัตรเครดิต / เดบิต";
      case OrderPaymentMethodEnum.BANK_TRANSFER:
        return "โอนผ่านธนาคาร";
      case OrderPaymentMethodEnum.E_WALLET:
        return "E-Wallet";
      default:
        break;
    }
  },
  orderStatus: function (value: OrderStatusEnum) {
    switch (value) {
      case OrderStatusEnum.PENDING:
        return "กำลังดำเนินการ";
      case OrderStatusEnum.PAID:
        return "จ่ายแล้ว";
      case OrderStatusEnum.CANCELLED:
        return "ยกเลิก";
      case OrderStatusEnum.COMPLETED:
        return "ปิดการขาย";
      default:
        break;
    }
  },

  userRole: function (value: UserRoleEnum) {
    switch (value) {
      case UserRoleEnum.ADMIN:
        return "แอดมิน";
      case UserRoleEnum.SELLER:
        return "พนักงาน";
      default:
        break;
    }
  },
};
