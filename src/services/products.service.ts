import createError from "http-errors";
import Product, { IProduct } from "../models/products.model";
import mongoose from "mongoose";

const findAll = async (query: any) => {
  // pagination
  console.log("query", query);
  const { page = 1, limit = 5, keyword = null, sort_type = 'desc', sort_by = 'createdAt', cat_id = null } = query; // default 1, default cat_id = null

  console.log("keyword", keyword);
  console.log("cat_id", cat_id);

  let sortObject = {};
  sortObject = { ...sortObject, [sort_by]: sort_type === 'desc' ? -1 : 1};

  const where: any = {};
  // add filter to where

  if(keyword){  // keyword not null
    where.product_name = {$regex: keyword, $options: 'i'};
  }

  if(cat_id) {
    where.category_id = new mongoose.mongo.ObjectId(cat_id); // object casting
  }

  const skip = (page - 1) * limit;
  const productDB = await Product.find(
    {
      ...where,
    }
  )
    .skip(skip)
    .limit(limit)
    .sort({ ...sortObject })
  return {
    productDB,
    page, // current page number
    limit,
    totalRecords: await Product.countDocuments(),
  };
};

const findById = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw createError(404, "Product not found");
  }
  return product;
};

const create = (payload: any) => {
  const newProduct = new Product({
    product_name: payload.product_name,
    description: payload.description,
    slug: payload.slug,
    sku: payload.sku,
    price: payload.price,
    stock: payload.stock,
    image_url: payload.image_url,
    variant: payload.variant,
    isDeleted: payload.isDeleted,
  });
  newProduct.save();
  return newProduct;
};

const updateById = async (id: string, payload: IProduct) => {
  // https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
  const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
    new: true, // return modified instead
    runValidators: true, // is it valid with model in Product
  });
  if (!updatedProduct) {
    throw createError(404, "Product not found");
  }
  return updatedProduct;
};

const deleteById = async (id: string) => {
  const deleteProduct = await Product.findByIdAndDelete(id);
  if (!deleteProduct) {
    throw createError(404, "Product not found");
  }
  return deleteProduct;
};

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById
};
