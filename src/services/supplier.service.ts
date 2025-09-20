// supplier.service.ts
import Supplier from '../models/suppliers.model';

export const findAll = async () => {
  return await Supplier.find();
};

export const findById = async (id: string) => {
  return await Supplier.findById(id);
};

export const create = async (data: any) => {
  const doc = new Supplier(data);
  return await doc.save();
};

export const update = async (id: string, data: any) => {
  return await Supplier.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Supplier.findByIdAndDelete(id);
};
