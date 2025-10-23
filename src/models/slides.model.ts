import { Schema, model, Document } from "mongoose";

export interface ISlide extends Document {
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const slideSchema = new Schema<ISlide>(
  {
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

export default model<ISlide>("Slide", slideSchema);