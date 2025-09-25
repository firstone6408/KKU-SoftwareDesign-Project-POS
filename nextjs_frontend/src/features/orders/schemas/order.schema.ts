import z from "zod";
import { OrderStatus } from "../services/order.enum";
import { customerSchema } from "@/features/customers/schemas/customer.schema";
import { productSchema } from "@/features/products/schemas/product.schema";
import { userSchema } from "@/features/users/schemas/user.schema";

const saleInoviceSchema = z.object({
  id: z.string(),
  paymentMethod: z.string(),
  slipImageUrl: z.string().nullable(),
  paidAmount: z.number(),
  changeAmount: z.number(),
  discount: z.number(),
  totalAmount: z.number(),
  inoviceDate: z.string(),
});

const orderItemSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  product: productSchema,
});

export const orderSchema = z.object({
  id: z.string(),
  orderCode: z.string(),
  status: z.nativeEnum(OrderStatus),
  totalAmount: z.number(),
  discount: z.number(),
  note: z.string().nullable(),
  orderDate: z.string(),
  deliveryDate: z.string().nullable(),
  updatedAt: z.string(),
  customer: customerSchema,
  saleInovice: saleInoviceSchema.nullable(),
  createdBy: userSchema,
  items: z.array(orderItemSchema),
});

export type IOrder = z.infer<typeof orderSchema>;

export type IOrderItem = z.infer<typeof orderItemSchema>;

//export type ISaleInovice = z.infer<typeof saleInoviceSchema>;
