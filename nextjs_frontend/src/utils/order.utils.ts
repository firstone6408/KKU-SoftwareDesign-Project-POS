import {
  IOrder,
  IOrderItem,
} from "@/features/orders/schemas/order.schema";
import { OrderStatusEnum } from "@/features/orders/services/order.enum";

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
  check: {
    isClosed: function (order: IOrder) {
      return order.status === OrderStatusEnum.COMPLETED;
    },
    isCanceled: function (order: IOrder) {
      return order.status === OrderStatusEnum.CANCELLED;
    },
    canDoPayment: function (order: IOrder) {
      return (
        order.items.length === 0 ||
        this.isCanceled(order) ||
        order.deliveryDate === null
      );
    },
    canDoWorking: function (order: IOrder) {
      return this.isClosed(order) || this.isCanceled(order);
    },
  },
};
