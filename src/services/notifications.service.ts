// notifications.service.ts
import Notifications from '../models/notifications.model';

export const findAll = async () => {
  return await Notifications.find();
};

export const findById = async (id: string) => {
  return await Notifications.findById(id);
};

export const create = async (data: any) => {
  const doc = new Notifications(data);
  return await doc.save();
};

export const update = async (id: string, data: any) => {
  return await Notifications.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Notifications.findByIdAndDelete(id);
};
