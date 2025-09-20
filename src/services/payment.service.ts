// payment.service.ts
import Payment from '../models/payments.model';

export const findAll = async () => {
  return await Payment.find();
};

export const findById = async (id: string) => {
  return await Payment.findById(id);
};

export const create = async (data: any) => {
  const doc = new Payment(data);
  return await doc.save();
};

export const update = async (id: string, data: any) => {
  return await Payment.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Payment.findByIdAndDelete(id);
};
