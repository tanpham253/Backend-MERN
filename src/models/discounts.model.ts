// discount.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IDiscount extends Document {
  code: string;
  description?: string;
  discount_percent: number;
  start_date?: Date;
  end_date?: Date;
  is_active: boolean;
}

const discountSchema = new Schema<IDiscount>(
  {
    code: { type: String, required: true, trim: true, unique: true, maxlength: 50 },
    description: { type: String, required: false, maxlength: 500 },
    discount_percent: { type: Number, required: true, min: 0, max: 100 },
    start_date: { type: Date, required: false },
    end_date: { type: Date, required: false },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: false }
);

const Discount = model<IDiscount>('Discount', discountSchema);
export default Discount;
