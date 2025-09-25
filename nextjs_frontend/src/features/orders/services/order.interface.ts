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
