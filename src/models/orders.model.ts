// orders.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IOrder extends Document {
  customer_id: number;
  shipment_id?: number;
  discount_id?: number;
  status: string;
  total_amount: number;
  order_date?: Date;
  updated_at?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    customer_id: { type: Number, required: true },
    shipment_id: { type: Number, required: false },
    discount_id: { type: Number, required: false },
    status: { type: String, required: true, trim: true, maxlength: 50 },
    total_amount: { type: Number, required: true },
    order_date: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const Order = model<IOrder>('Order', orderSchema);
export default Order;
