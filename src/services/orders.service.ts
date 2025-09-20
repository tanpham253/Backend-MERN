// orders.service.ts
import Order from '../models/orders.model';

export const findAll = async () => {
  return await Order.find();
};

export const findById = async (id: string) => {
  return await Order.findById(id);
};

export const create = async (data: any) => {
  const order = new Order(data);
  return await order.save();
};

export const update = async (id: string, data: any) => {
  return await Order.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Order.findByIdAndDelete(id);
};
