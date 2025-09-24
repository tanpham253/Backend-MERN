// order_items.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IOrderItem extends Document {
  order_id: Schema.Types.ObjectId;
  product_id: Schema.Types.ObjectId;
  quantity: number;
  unit_price: number;
  total_price?: number;
  created_at?: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    order_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Order',
      required: true 
    },
    product_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Product',
      required: true 
    },
    quantity: { type: Number, required: true },
    unit_price: { type: Number, required: true },
    total_price: { type: Number, required: false },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const OrderItem = model<IOrderItem>('OrderItem', orderItemSchema);
export default OrderItem;
