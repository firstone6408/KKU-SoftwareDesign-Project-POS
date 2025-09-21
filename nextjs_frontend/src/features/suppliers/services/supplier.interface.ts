export interface IUpsertSupplier {
  supplierName: string;
  supplierContactInfo: string | null;
}

export interface IDeleteSupplier {
  supplierId: string;
}
