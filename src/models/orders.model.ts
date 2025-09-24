// orders.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IOrder extends Document {
  customer_id: Schema.Types.ObjectId;
  shipment_id?: Schema.Types.ObjectId;
  discount_id?: Schema.Types.ObjectId;
  payment_id?: Schema.Types.ObjectId;
  status: string;
  total_amount: number;
  order_date?: Date;
  updated_at?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    customer_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Customer',
      required: true 
    },
    shipment_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Shipment',
      required: false 
    },
    discount_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Discount',
      required: false 
    },
    payment_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Payment',
      required: false 
    },
    status: { type: String, required: true, trim: true, maxlength: 50 },
    total_amount: { type: Number, required: true },
    order_date: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const Order = model<IOrder>('Order', orderSchema);
export default Order;
