// order_items.service.ts
import OrderItem from '../models/orderItems.model';

export const findAll = async () => {
  return await OrderItem.find();
};

export const findById = async (id: string) => {
  return await OrderItem.findById(id);
};

export const create = async (data: any) => {
  const orderItem = new OrderItem(data);
  return await orderItem.save();
};

export const update = async (id: string, data: any) => {
  return await OrderItem.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await OrderItem.findByIdAndDelete(id);
};
