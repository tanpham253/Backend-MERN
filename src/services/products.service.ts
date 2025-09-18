import createError from "http-errors";
import Product from "../models/products.model";

const findAll = async () => {
  const productDB = await Product.find();
  return productDB;
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

const updateById = async (id: string, payload: any) => {
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
  deleteById,
};
