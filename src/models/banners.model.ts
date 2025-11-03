import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBanner extends Document {
  name: string;
  slug: string;
  img: string;
  position: string;
  product_id?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BannerSchema: Schema<IBanner> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    img: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      default: "custom",
      trim: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: "#",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Banner ||
  mongoose.model<IBanner>("Banner", BannerSchema);
