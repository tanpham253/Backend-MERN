import { NextFunction, Request, Response } from "express";
import categoriesService from "../services/categories.service";
import sendJsonSuccess from "../helper/response.helper";


const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await categoriesService.findAll();
        //console.log('<<=== 🚀 categories Controller ===>>', categories
        sendJsonSuccess(res, categories);
    } catch (error) {
        next(error);
    }
};


const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const category = await categoriesService.findById(id);
        sendJsonSuccess(res, category);
    } catch (error) {
        next(error);
    }
};


const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await categoriesService.create(req.body);
        sendJsonSuccess(res, category);
    } catch (error) {
        next(error);
    }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedArticle = await categoriesService.updateById(id, req.body);
    sendJsonSuccess(res, updatedArticle);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedArticle = await categoriesService.deleteById(id);
    sendJsonSuccess(res, deletedArticle);
  } catch (error) {
    next(error);
  }
};

export default {
    findAll,
    findById,
    create,
    deleteById,
    updateById
};