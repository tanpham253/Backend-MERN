// wishlist.service.ts
import Wishlist from '../models/wishlists.model';

export const findAll = async () => {
  return await Wishlist.find();
};

export const findById = async (id: string) => {
  return await Wishlist.findById(id);
};

export const findByCustomerId = async (customer_id: string) => {
  return await Wishlist.find({ customer_id });
};

export const create = async (data: any) => {
  const wishlist = new Wishlist(data);
  return await wishlist.save();
};

export const update = async (id: string, data: any) => {
  return await Wishlist.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Wishlist.findByIdAndDelete(id);
};
