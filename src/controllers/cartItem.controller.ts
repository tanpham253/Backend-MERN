// cart_items.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as cartItemsService from '../services/cartItems.service';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cartItems = await cartItemsService.findAll();
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cartItem = await cartItemsService.findById(req.params.id);
    res.json(cartItem);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cartItem = await cartItemsService.create(req.body);
    res.status(201).json(cartItem);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await cartItemsService.update(req.params.id, req.body);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await cartItemsService.remove(req.params.id);
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