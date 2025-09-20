// supplier.model.ts
import { Schema, model, Document } from 'mongoose';

export interface ISupplier extends Document {
  supplier_id?: number;
  name: string;
  description?: string;
  contact_info?: string;
  created_at?: Date;
}

const supplierSchema = new Schema<ISupplier>(
  {
    supplier_id: { type: Number },
    name: { type: String },
    description: { type: String, required: false },
    contact_info: { type: String, required: false },
    created_at: { type: Date, required: false },
  },
  { timestamps: false }
);

const Supplier = model<ISupplier>('Supplier', supplierSchema);
export default Supplier;
