import { Schema, model, Document } from 'mongoose';

export interface IAddress extends Document {
  address_id?: number;
  customer_id: Schema.Types.ObjectId;
  city?: string;
  district?: string;
  ward?: string;
  street?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const addressSchema = new Schema<IAddress>(
  {
    address_id: { type: Number },
    customer_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Customer',
      required: true 
    },
    city: { type: String },
    district: { type: String },
    ward: { type: String },
    street: { type: String },
  },
  { timestamps: true }
);

const Address = model<IAddress>('Address', addressSchema);
export default Address;
