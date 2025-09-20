// shipment.service.ts
import Shipment from '../models/shipments.model';

export const findAll = async () => {
  return await Shipment.find();
};

export const findById = async (id: string) => {
  return await Shipment.findById(id);
};

export const create = async (data: any) => {
  const doc = new Shipment(data);
  return await doc.save();
};

export const update = async (id: string, data: any) => {
  return await Shipment.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Shipment.findByIdAndDelete(id);
};
