// inventory.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IInventory extends Document {
  inventory_id?: number;
  product_id: number;
  change_type: string;
  quantity: number;
  note?: string;
  change_date?: Date;
}

const inventorySchema = new Schema<IInventory>(
  {
    inventory_id: { type: Number },
    product_id: { type: Number },
    change_type: { type: String },
    quantity: { type: Number },
    note: { type: String, required: false },
    change_date: { type: Date, required: false },
  },
  { timestamps: false }
);

const Inventory = model<IInventory>('Inventory', inventorySchema);
export default Inventory;
