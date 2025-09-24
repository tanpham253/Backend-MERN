// cart.model.ts
import { Schema, model, Document } from 'mongoose';

export interface ICart extends Document {
  customer_id: Schema.Types.ObjectId;
  created_date?: Date;
  updated_at?: Date;
}

const cartSchema = new Schema<ICart>(
  {
    customer_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Customer',
      required: true 
    },
    created_date: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const Cart = model<ICart>('Cart', cartSchema);
export default Cart;
