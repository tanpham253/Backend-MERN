import type { FilterQuery } from 'mongoose';
import Brand from '../models/brands.model';

export const findAll = async () => {
  const brandDB =  await Brand.find();
  return brandDB;
};

export const findAllPage = async (query?: any) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const keyword = query?.keyword || '';
  const skip = (page - 1) * limit;

  const filter: FilterQuery<typeof Brand> = keyword
    ? { brand_name: { $regex: keyword, $options: 'i' } }
    : {};

  const [brands, totalRecords] = await Promise.all([
    Brand.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Brand.countDocuments(filter),
  ]);

  return {
    brands,
    page,
    limit,
    totalRecords,
  };
};

export const findById = async (id: string) => {
  const brand = await Brand.findById(id);
  if (!brand) throw new Error('Brand not found');
  return brand;
};

export const create = async (data: any) => {
  const exists = await Brand.findOne({ brand_name: data.brand_name });
  if (exists) throw new Error('Brand already exists');
  const brand = new Brand(data);
  return await brand.save();
};

export const update = async (id: string, data: any) => {
  const brand = await Brand.findByIdAndUpdate(id, data, { new: true });
  if (!brand) throw new Error('Brand not found');
  return brand;
};

export const remove = async (id: string) => {
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) throw new Error('Brand not found');
  return brand;
};