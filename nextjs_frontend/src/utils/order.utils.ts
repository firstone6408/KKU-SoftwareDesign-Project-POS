import {
  IOrder,
  IOrderItem,
} from "@/features/orders/schemas/order.schema";

export const OrderUtil = {
  calculate: {
    totalPrice: function (orderItem: IOrderItem) {
      const totalPrice = orderItem.quantity * orderItem.unitPrice;

      return totalPrice;
    },

    // ยอดเงินคงเหลือจริง (หลังหักส่วนลด)
    actualRemainingAmount: function (order: IOrder) {
      const remaining = order.totalAmount - (order.discount || 0);
      return remaining > 0 ? remaining : 0;
    },
  },
};
