import Slide from '../models/slides.model';

export const findAll = async () => {
  return await Slide.find();
};

export const findById = async (id: string) => {
  return await Slide.findById(id);
};

export const create = async (data: any) => {
  const doc = new Slide(data);
  return await doc.save();
};

export const update = async (id: string, data: any) => {
  return await Slide.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Slide.findByIdAndDelete(id);
};
