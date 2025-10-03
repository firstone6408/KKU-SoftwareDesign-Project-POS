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

    totalQuantity: function (order: IOrder) {
      return order.items.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
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
  aggregate: {
    // filter เฉพาะ order ที่ completed
    completedOrders: function (orders: IOrder[]) {
      return orders.filter((o) => o.status === OrderStatusEnum.COMPLETED);
    },
    // ยอดขายรายวัน
    salesByDay: function (orders: IOrder[], targetDate?: string) {
      const completed = this.completedOrders(orders);
      const target = targetDate ? new Date(targetDate) : new Date();

      return completed
        .filter((o) => {
          const d = new Date(o.orderDate);
          return (
            d.getFullYear() === target.getFullYear() &&
            d.getMonth() === target.getMonth() &&
            d.getDate() === target.getDate()
          );
        })
        .reduce((sum, o) => sum + (o.totalAmount - o.discount), 0);
    },

    // ยอดขายรายเดือน
    salesByMonth: function (orders: IOrder[], targetDate?: string) {
      const completed = this.completedOrders(orders);
      const target = targetDate ? new Date(targetDate) : new Date();

      return completed
        .filter((o) => {
          const d = new Date(o.orderDate);
          return (
            d.getFullYear() === target.getFullYear() &&
            d.getMonth() === target.getMonth()
          );
        })
        .reduce((sum, o) => sum + (o.totalAmount - o.discount), 0);
    },

    // ยอดขายรายปี
    salesByYear: function (orders: IOrder[], targetDate?: string) {
      const completed = this.completedOrders(orders);
      const target = targetDate ? new Date(targetDate) : new Date();

      return completed
        .filter((o) => {
          const d = new Date(o.orderDate);
          return d.getFullYear() === target.getFullYear();
        })
        .reduce((sum, o) => sum + (o.totalAmount - o.discount), 0);
    },

    // ยอดขายรายบุคคล (ตาม customer)
    salesByCustomer: function (orders: IOrder[]) {
      const completed = this.completedOrders(orders);
      const result: Record<string, number> = {};
      completed.forEach((o) => {
        const key = o.customer.name;
        result[key] = (result[key] || 0) + (o.totalAmount - o.discount);
      });
      return result;
    },

    // ลูกค้าที่มาบ่อยสุด (นับจำนวน order)
    frequentCustomers: function (orders: IOrder[]) {
      const completed = this.completedOrders(orders);
      const result: Record<string, number> = {};
      completed.forEach((o) => {
        const key = o.customer.name;
        result[key] = (result[key] || 0) + 1;
      });
      return result;
    },

    // สินค้าขายดี (นับจาก quantity)
    bestSellingProducts: function (orders: IOrder[]) {
      const completed = this.completedOrders(orders);
      const result: Record<string, number> = {};
      completed.forEach((o) => {
        o.items.forEach((item) => {
          const key = `${item.product.supplier.name} ${item.product.name}`;
          result[key] = (result[key] || 0) + item.quantity;
        });
      });
      return result;
    },

    // ยอดขายรายพนักงาน
    salesByEmployee: function (orders: IOrder[]) {
      const completed = this.completedOrders(orders);
      const result: Record<string, number> = {};
      completed.forEach((o) => {
        const key = o.createdBy.name; // ใช้ชื่อพนักงาน
        result[key] = (result[key] || 0) + (o.totalAmount - o.discount);
      });
      return result;
    },

    // ลูกพนักงานทำยอดเยอะสุด (นับจำนวน order)
    frequentEmployees: function (orders: IOrder[]) {
      const completed = this.completedOrders(orders);
      const result: Record<string, number> = {};
      completed.forEach((o) => {
        const key = o.createdBy.name;
        result[key] = (result[key] || 0) + 1;
      });
      return result;
    },
  },
};
