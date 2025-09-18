import createError from "http-errors";
import Category from "../models/categories.model";

const findAll = async () => {
  const categoryDB = await Category.find();
  return categoryDB;
};

const findById = async (id: string) => {
  const category = await Category.findById(id);
  if (!category) {
    throw createError(404, "Category not found");
  }
  return category;
};

const create = (payload: any) => {
  const newCategory = new Category({
    title: payload.title,
    keyword: payload.keyword,
    description: payload.description,
    slug: payload.slug,
  });
  newCategory.save();
  return newCategory;
};

const updateById = async (id: string, payload: any) => {
    // https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
  const updatedCategory = await Category.findByIdAndUpdate(id, payload, {
    new: true, // return modified instead
    runValidators: true, // is it valid with model in Category
  });
  if (!updatedCategory) {
    throw createError(404, "Category not found");
  }
  return updatedCategory;
};

const deleteById = async (id: string) => {
  const deleteCategory = await Category.findByIdAndDelete(id);
  if (!deleteCategory) {
    throw createError(404, "Category not found");
  }
  return deleteCategory;
};

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
