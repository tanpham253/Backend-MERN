// cart.service.ts
import Cart from '../models/carts.model';

export const findAll = async () => {
  return await Cart.find()
    .populate('customer_id', 'first_name last_name email');
};

export const findById = async (id: string) => {
  return await Cart.findById(id)
    .populate('customer_id', 'first_name last_name email phone_number');
};

export const findByCustomerId = async (customer_id: string) => {
  return await Cart.find({ customer_id })
    .populate('customer_id', 'first_name last_name email phone_number');
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
