import { Schema, model } from "mongoose";

export interface ICategory {
    name: string,
    description?: string,
    slug: string,
}

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: { type: String },
    slug: {
      type: String,
      required: true,
    },
  }, // schema options 2nd argument (tham so)
  {
    timestamps: false, // createdAt, updatedAt
    versionKey: false, // __v
    // collection: "categories", // custom collection name or else default name at the line below
  }
);

const Category = model("Category", categorySchema);
export default Category;
