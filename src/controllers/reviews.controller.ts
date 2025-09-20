// review.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as reviewService from '../services/reviews.service';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await reviewService.findAll();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const review = await reviewService.findById(req.params.id);
    res.json(review);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const review = await reviewService.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await reviewService.update(req.params.id, req.body);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await reviewService.remove(req.params.id);
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