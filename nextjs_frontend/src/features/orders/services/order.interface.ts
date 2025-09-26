import { OrderPaymentMethodEnum } from "./order.enum";

export interface ICreateOrder {
  customerId: string;
}

export interface IAddItemInOrder {
  productId: string;
  quantity: number;
  productUnitPrice: number;
}

export interface IDeleteItemInOrder {
  productId: string;
  quantity: number;
}

export interface ISaveSummaryOrder {
  orderDiscount: number;
  orderDeliveryDate: string;
  orderNote: string | null;
}

export interface IPaymentOrder {
  orderPaidAmount: number;
  orderDiscount: number;
  orderPaymentMethod: OrderPaymentMethodEnum;
  orderSlipImage: File;
  orderInoviceDate: string;
}
