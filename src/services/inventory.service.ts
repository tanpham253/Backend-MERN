// inventory.service.ts
import Inventory from '../models/inventory.model';

export const findAll = async () => {
  return await Inventory.find();
};

export const findById = async (id: string) => {
  return await Inventory.findById(id);
};

export const create = async (data: any) => {
  const doc = new Inventory(data);
  return await doc.save();
};

export const update = async (id: string, data: any) => {
  return await Inventory.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Inventory.findByIdAndDelete(id);
};
