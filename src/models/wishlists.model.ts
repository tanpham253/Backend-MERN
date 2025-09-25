// wishlist.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IWishlist extends Document {
  customer_id: Schema.Types.ObjectId;
  product_id: Schema.Types.ObjectId;
  added_at?: Date;
}

const wishlistSchema = new Schema<IWishlist>(
  {
    customer_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Customer',
      required: true 
    },
    product_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Product',
      required: true 
    },
    added_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const Wishlist = model<IWishlist>('Wishlist', wishlistSchema);
export default Wishlist;
