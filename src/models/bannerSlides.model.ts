import { Schema, model, Document } from "mongoose";

export interface IBannerSlide extends Document {
  title: string;
  description?: string;
  image_url: string;
  link?: string;
  order: number;
  is_active: boolean;
  start_date?: Date | null;
  end_date?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const bannerSlideSchema = new Schema<IBannerSlide>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 120,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 500,
    },
    image_url: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
      min: 0,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    start_date: {
      type: Date,
      default: null,
    },
    end_date: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BannerSlide = model<IBannerSlide>("BannerSlide", bannerSlideSchema);
export default BannerSlide;
