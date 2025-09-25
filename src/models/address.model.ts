// address.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IAddress extends Document {
  address_id?: number;
  customer_id: Schema.Types.ObjectId;
  city?: string;
  district?: string;
  ward?: string;
  street?: string;
  created_at?: Date;
}

const addressSchema = new Schema<IAddress>(
  {
    address_id: { type: Number },
    customer_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Customer',
      required: true 
    },
    city: { type: String, required: false },
    district: { type: String, required: false },
    ward: { type: String, required: false },
    street: { type: String, required: false },
  },
  { timestamps: false }
);

const Address = model<IAddress>('Address', addressSchema);
export default Address;
