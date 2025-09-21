export interface IUpsertCustomer {
  customerName: string;
  customerContactInfo: string | null;
}

export interface IDeleteCustomer {
  customerId: string;
}
