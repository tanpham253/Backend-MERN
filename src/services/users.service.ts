// users.service.ts
import Users from '../models/users.model';

export const findAll = async () => {
  return await Users.find();
};

export const findById = async (id: string) => {
  return await Users.findById(id);
};

export const create = async (data: any) => {
  const doc = new Users(data);
  return await doc.save();
};

export const update = async (id: string, data: any) => {
  return await Users.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Users.findByIdAndDelete(id);
};
