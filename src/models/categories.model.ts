import { Schema, model } from "mongoose";
import { version } from "os";

const categorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    description: { type: String, required: false, maxlength: 5000 },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 255,
    },
    
  }, // schema options 2nd argument (tham so)
  {
    timestamps: true, // createdAt, updatedAt
    versionKey: false, // __v
    // collection: "categories", // custom collection name or else default name at the line below
  }
);


const category = model("Category", categorySchema);
export default category;
