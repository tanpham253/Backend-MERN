// review.service.ts
import Review from '../models/reviews.model';

export const findAll = async () => {
  return await Review.find();
};

export const findById = async (id: string) => {
  return await Review.findById(id);
};

export const create = async (data: any) => {
  const review = new Review(data);
  return await review.save();
};

export const update = async (id: string, data: any) => {
  return await Review.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Review.findByIdAndDelete(id);
};
