import { AdjustStockProductEnum } from "@/features/products/services/product.enum";

export const TransaleEnumUtil = {
  translateAdjustStockProductEnum: (value: AdjustStockProductEnum) => {
    switch (value) {
      case AdjustStockProductEnum.INCREASE:
        return "เพิ่มสินค้า";
      case AdjustStockProductEnum.DECREASE:
        return "ลดสินค้า";
      default:
        return value;
    }
  },
};
