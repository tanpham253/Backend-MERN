// review.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IReview extends Document {
  product_id: Schema.Types.ObjectId;
  customer_id: Schema.Types.ObjectId;
  rating: number;
  comment?: string;
  created_at?: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    product_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Product',
      required: true 
    },
    customer_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Customer',
      required: true 
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: false, maxlength: 1000 },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const Review = model<IReview>('Review', reviewSchema);
export default Review;
