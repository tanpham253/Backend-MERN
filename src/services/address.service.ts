import createError from "http-errors";
import Address from '../models/address.model';

export const findAll = async () => {
  return await Address.find().populate('customer_id', 'first_name last_name email');
};

export const findById = async (id: string) => {
  const doc = await Address.findById(id).populate('customer_id', 'first_name last_name email');
  if (!doc) throw createError(404, "Address not found");
  return doc;
};

export const findByCustomerId = async (customer_id: string) => {
  const docs = await Address.find({ customer_id }).populate('customer_id', 'first_name last_name email');
  if (!docs || docs.length === 0) throw createError(404, "No addresses found for this customer");
  return docs;
};

export const create = async (data: any) => {
  const doc = new Address(data);
  return await doc.save();
};

export const update = async (id: string, data: any) => {
  const doc = await Address.findByIdAndUpdate(id, data, { new: true }).populate('customer_id', 'first_name last_name email');
  if (!doc) throw createError(404, "Address not found");
  return doc;
};

export const remove = async (id: string) => {
  const doc = await Address.findByIdAndDelete(id);
  if (!doc) throw createError(404, "Address not found");
  return doc;
};
