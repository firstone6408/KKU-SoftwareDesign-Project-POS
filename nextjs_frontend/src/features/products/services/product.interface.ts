import { AdjustStockProductEnum } from "./product.enum";

export interface ICreateProduct {
  productBarcode: string;
  productName: string;
  productDescription: string | null;
  productStockLevel: number;
  productUnitPrice: number;
  categoryId: string;
  supplierId: string;
  productImage: File | null;
}

export interface IUpdateProduct {
  productBarcode: string;
  productName: string;
  productDescription: string | null;
  categoryId: string;
  supplierId: string;
  productImage: File | null;
}

export interface IUpdateUnitPriceProduct {
  productUnitPrice: number;
}

export interface IUpdateStockProduct {
  quantity: number;
  adjustStockType: AdjustStockProductEnum;
}
