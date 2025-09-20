// users.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IUsers extends Document {
  user_id?: number;
  role_id: number;
  username: string;
  password: string;
  email: string;
  full_name?: string;
  is_active?: boolean;
  created_at?: Date;
  last_login?: Date;
}

const usersSchema = new Schema<IUsers>(
  {
    user_id: { type: Number },
    role_id: { type: Number },
    username: { type: String },
    password: { type: String },
    email: { type: String },
    full_name: { type: String, required: false },
    is_active: { type: Boolean, required: false },
    created_at: { type: Date, required: false },
    last_login: { type: Date, required: false },
  },
  { timestamps: false }
);

const Users = model<IUsers>('Users', usersSchema);
export default Users;
