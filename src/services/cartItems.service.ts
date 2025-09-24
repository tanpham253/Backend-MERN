// cart_items.service.ts
import CartItem from '../models/cartItems.model';

export const findAll = async () => {
  return await CartItem.find()
    .populate('cart_id', 'customer_id created_date')
    .populate('product_id', 'product_name price sku');
};

export const findById = async (id: string) => {
  return await CartItem.findById(id)
    .populate('cart_id', 'customer_id created_date')
    .populate('product_id', 'product_name price sku description image_url');
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
