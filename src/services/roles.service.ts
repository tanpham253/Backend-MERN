// roles.service.ts
import Roles from '../models/roles.model';

export const findAll = async () => {
  return await Roles.find();
};

export const findById = async (id: string) => {
  return await Roles.findById(id);
};

export const create = async (data: any) => {
  const doc = new Roles(data);
  return await doc.save();
};

export const update = async (id: string, data: any) => {
  return await Roles.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Roles.findByIdAndDelete(id);
};
