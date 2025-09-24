// brand.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IBrand extends Document {
  brand_id?: number;
  name: string;
  slug?: string;
  description?: string;
  created_at?: Date;
}

const brandSchema = new Schema<IBrand>(
  {
    brand_id: { type: Number },
    name: { type: String },
    slug: { type: String, required: false },
    description: { type: String, required: false },
    created_at: { type: Date, required: false },
  },
  { timestamps: false }
);

const Brand = model<IBrand>('Brand', brandSchema);
export default Brand;
