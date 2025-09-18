import { Schema, model } from "mongoose";
import { version } from "os";

const productSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    description: { 
      type: String, 
      required: false, 
      maxlength: 5000 },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 255,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      minlength: 3,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    image_url: {
      type: String,
      required: false,
      trim: true,
    },
    variant: [
      {
        type: String,
        trim: true,
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  }, // schema options 2nd argument (tham so)
  {
    timestamps: true, // createdAt, updatedAt
    versionKey: false, // __v
    // collection: "products", // custom collection name or else default name at the line below
  }
);


const product = model("Product", productSchema);
export default product;
