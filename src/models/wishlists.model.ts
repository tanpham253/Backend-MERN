// wishlist.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IWishlist extends Document {
  customer_id: number;
  product_id: number;
  added_at?: Date;
}

const wishlistSchema = new Schema<IWishlist>(
  {
    customer_id: { type: Number, required: true },
    product_id: { type: Number, required: true },
    added_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const Wishlist = model<IWishlist>('Wishlist', wishlistSchema);
export default Wishlist;
