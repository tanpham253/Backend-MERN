import { Schema, model } from "mongoose";
import { applyPasswordHashing } from "../configs/hashPassword";

export interface ICustomer extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  address_id?: Schema.Types.ObjectId;
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
    address_id: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
    versionKey: false, // __v

    virtuals: {
      fullName:{
        get() {
          return `${this.first_name} ${this.last_name}`;
        }
      }
    },
    toJSON: {
      virtuals: true,
      transform: (doc,ret) => {
        delete (ret as { password?: string }).password; // do not return password
        return ret;
      }
    },
    toObject: {
      virtuals: true,
      transform: (doc,ret) => {
        delete (ret as { password?: string }).password; // do not return password
        return ret;
      }
    }
  }
);

applyPasswordHashing(customerSchema);

const customer = model("Customer", customerSchema);
export default customer;
