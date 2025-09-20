// cart.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as cartService from '../services/cart.service';

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

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await cartService.create(req.body);
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await cartService.update(req.params.id, req.body);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await cartService.remove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
