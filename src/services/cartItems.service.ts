// cart_items.service.ts
import CartItem from '../models/cart_items.model';

export const findAll = async () => {
  return await CartItem.find();
};

export const findById = async (id: string) => {
  return await CartItem.findById(id);
};

export const create = async (data: any) => {
  const cartItem = new CartItem(data);
  return await cartItem.save();
};

export const update = async (id: string, data: any) => {
  return await CartItem.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await CartItem.findByIdAndDelete(id);
};
