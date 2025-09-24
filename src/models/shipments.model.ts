// shipment.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IShipment extends Document {
  shipment_id?: number;
  tracking_number?: string;
  carrier?: string;
  shipped_date?: Date;
  delivery_date?: Date;
  status?: string;
  created_at?: Date;
}

const shipmentSchema = new Schema<IShipment>(
  {
    shipment_id: { type: Number },
    tracking_number: { type: String, required: false },
    carrier: { type: String, required: false },
    shipped_date: { type: Date, required: false },
    delivery_date: { type: Date, required: false },
    status: { type: String, required: false },
    created_at: { type: Date, required: false },
  },
  { timestamps: false }
);

const Shipment = model<IShipment>('Shipment', shipmentSchema);
export default Shipment;
