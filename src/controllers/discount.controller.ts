// discount.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as discountService from '../services/discounts.service';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const discounts = await discountService.findAll();
    res.json(discounts);
  } catch (error) {
    next(error);
  }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const discount = await discountService.findById(req.params.id);
    res.json(discount);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const discount = await discountService.create(req.body);
    res.status(201).json(discount);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await discountService.update(req.params.id, req.body);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await discountService.remove(req.params.id);
    res.status(204).end();
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