import createError from "http-errors";
import Category from "../models/categories.model";

const findAll = async () => {
  const articleDB = await Category.find();
  return articleDB;
};

const findById = async (id: string) => {
  const article = await Category.findById(id);
  if (!article) {
    throw createError(404, "Category not found");
  }
  return article;
};

const create = (payload: any) => {
  const newArticle = new Category({
    title: payload.title,
    keyword: payload.keyword,
    description: payload.description,
    content: payload.content,
    date: payload.date,
  });
  newArticle.save();
  return newArticle;
};

const updateById = async (id: string, payload: any) => {
    // https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
  const updatedArticle = await Category.findByIdAndUpdate(id, payload, {
    new: true, // return modified instead
    runValidators: true, // is it valid with model in Category
  });
  if (!updatedArticle) {
    throw createError(404, "Category not found");
  }
  return updatedArticle;
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
