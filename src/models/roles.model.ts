// roles.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IRoles extends Document {
  role_id?: number;
  name: string;
  description?: string;
  created_at?: Date;
}

const rolesSchema = new Schema<IRoles>(
  {
    role_id: { type: Number },
    name: { type: String },
    description: { type: String, required: false },
    created_at: { type: Date, required: false },
  },
  { timestamps: false }
);

const Roles = model<IRoles>('Roles', rolesSchema);
export default Roles;
