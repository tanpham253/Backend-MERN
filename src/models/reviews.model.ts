// review.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IReview extends Document {
  product_id: number;
  customer_id: number;
  rating: number;
  comment?: string;
  created_at?: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    product_id: { type: Number, required: true },
    customer_id: { type: Number, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: false, maxlength: 1000 },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const Review = model<IReview>('Review', reviewSchema);
export default Review;
