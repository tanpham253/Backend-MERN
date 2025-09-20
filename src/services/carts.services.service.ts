// cart.service.ts
import Cart from '../models/cart.model';

export const findAll = async () => {
  return await Cart.find();
};

export const findById = async (id: string) => {
  return await Cart.findById(id);
};

export const create = async (data: any) => {
  const cart = new Cart(data);
  return await cart.save();
};

export const update = async (id: string, data: any) => {
  return await Cart.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Cart.findByIdAndDelete(id);
};
