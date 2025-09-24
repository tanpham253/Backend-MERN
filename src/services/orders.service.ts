// orders.service.ts
import Order from '../models/orders.model';

export const findAll = async () => {
  return await Order.find()
    .populate('customer_id', 'first_name last_name email')
    .populate('shipment_id', 'tracking_number carrier status')
    .populate('discount_id', 'code discount_percent')
    .populate('payment_id', 'method provider');
};

export const findById = async (id: string) => {
  return await Order.findById(id)
    .populate('customer_id', 'first_name last_name email phone_number')
    .populate('shipment_id', 'tracking_number carrier shipped_date delivery_date status')
    .populate('discount_id', 'code discount_percent description')
    .populate('payment_id', 'method provider');
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
