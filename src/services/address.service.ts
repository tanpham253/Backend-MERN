// address.service.ts
import Address from '../models/address.model';

export const findAll = async () => {
  return await Address.find();
};

export const findById = async (id: string) => {
  return await Address.findById(id);
};

export const create = async (data: any) => {
  const doc = new Address(data);
  return await doc.save();
};

export const update = async (id: string, data: any) => {
  return await Address.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Address.findByIdAndDelete(id);
};
