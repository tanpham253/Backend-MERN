import { Schema, model } from "mongoose";
import { version } from "os";

export interface ICustomer extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  is_active?: boolean;
  created_at: Date;
  updated_at: Date;
}

const customerSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone_number: {
      type: String,
      required: false,
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
    versionKey: false, // __v
    // collection: "customers", // custom collection name or else default name at the line below
  }
);


const customer = model("Customer", customerSchema);
export default customer;
