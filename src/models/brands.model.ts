import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: { type: String, required: false, maxlength: 5000 },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    discount: { type: Number, required: true, min: 0, max: 70, default: 0 },
    model_year: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear(), //not greater than current year
    },
    // reference to category
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category", // reference to Category model
      required: true,
    },
    thumbnail: { type: String, required: false, trim: true, maxlength: 255 },
  },
  {
    timestamps: true, // createdAt, updatedAt
    versionKey: false, // __v
  }
);

const Product = model("Product", productSchema);
export default Product;
