// payment.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IPayment extends Document {
  payment_id?: number;
  method: string;
  provider?: string;
  created_at?: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    payment_id: { type: Number },
    method: { type: String },
    provider: { type: String, required: false },
    created_at: { type: Date, required: false },
  },
  { timestamps: false }
);

const Payment = model<IPayment>('Payment', paymentSchema);
export default Payment;
