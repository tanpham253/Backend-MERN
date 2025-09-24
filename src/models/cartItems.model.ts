// cart_items.model.ts
import { Schema, model, Document } from 'mongoose';

export interface ICartItem extends Document {
  cart_id: Schema.Types.ObjectId;
  product_id: Schema.Types.ObjectId;
  quantity: number;
  added_at?: Date;
}

const cartItemSchema = new Schema<ICartItem>(
  {
    cart_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Cart',
      required: true 
    },
    product_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Product',
      required: true 
    },
    quantity: { type: Number, required: true },
    added_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const CartItem = model<ICartItem>('CartItem', cartItemSchema);
export default CartItem;
