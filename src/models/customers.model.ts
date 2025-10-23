import { Schema, model } from 'mongoose';
import { applyPasswordHashing } from "../configs/hashPassword";

export type ICustomers = {
  _id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip_code?: string;
  password?: string | null;
  active?: boolean;
  isDelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const customerSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    maxLength: 50
  },
  last_name: {
    type: String,
    required: true,
    maxLength: 50
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 150
  },
  street: {
    type: String,
    required: true,
    maxLength: 255
  },
  city: {
    type: String,
    required: true,
    maxLength: 50
  },
  state: {
    type: String,
    required: true,
    maxLength: 50
  },
  zip_code: {
    type: String,
    maxLength: 5,
    require: false,
  },
  password: {
    type: String,
    maxLength: 255,
    require: false,
    default: null
  },
  /* Khóa tài khoản */
  active: {
    type: Boolean,
    default: true,
    require: false
  },
  /* 
   Soft delete 
   Khi xóa sp thì đi update isDelete = true
   Thực tế ko được xóa khách hàng đã có đơn hàng
   */
   isDelete: {
    type: Boolean,
    require: false,
    default: false
  },
},
{
  timestamps: true, //Tạo tự động thêm 2 trường createAt, updateAt
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
});

applyPasswordHashing(customerSchema);
const Customer = model('Customer', customerSchema);

export default Customer