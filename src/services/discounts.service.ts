import Discount from '../models/discounts.model';

export const findAll = async () => {
  return await Discount.find();
};

export const findById = async (id: string) => {
  return await Discount.findById(id);
};

export const create = async (data: any) => {
  const discount = new Discount(data);
  return await discount.save();
};

export const update = async (id: string, data: any) => {
  return await Discount.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Discount.findByIdAndDelete(id);
};
