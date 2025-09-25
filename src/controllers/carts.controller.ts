// cart.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as cartService from '../services/carts.services.service';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carts = await cartService.findAll();
    res.json(carts);
  } catch (error) {
    next(error);
  }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await cartService.findById(req.params.id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const findByCustomerId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carts = await cartService.findByCustomerId(req.params.customer_id);
    res.json(carts);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await cartService.create(req.body);
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await cartService.remove(req.params.id);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await cartService.update(req.params.id, req.body);
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