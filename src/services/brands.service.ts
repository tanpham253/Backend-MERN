// brand.service.ts
import Brand from '../models/brands.model';

export const findAll = async () => {
  const brandDB = await Brand.find();
  return brandDB;
};

export const findById = async (id: string) => {
  return await Brand.findById(id);
};

export const create = async (data: any) => {
  const doc = new Brand(data);
  return await doc.save();
};

export const update = async (id: string, data: any) => {
  return await Brand.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Brand.findByIdAndDelete(id);
};
