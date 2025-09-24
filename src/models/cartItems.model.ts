// cart_items.model.ts
import { Schema, model, Document } from 'mongoose';

export interface ICartItem extends Document {
  cart_id: number;
  product_id: number;
  quantity: number;
  added_at?: Date;
}

const cartItemSchema = new Schema<ICartItem>(
  {
    cart_id: { type: Number, required: true },
    product_id: { type: Number, required: true },
    quantity: { type: Number, required: true },
    added_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const CartItem = model<ICartItem>('CartItem', cartItemSchema);
export default CartItem;
