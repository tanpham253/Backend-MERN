// orders.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as ordersService from '../services/orders.service';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await ordersService.findAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await ordersService.findById(req.params.id);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await ordersService.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await ordersService.remove(req.params.id);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await ordersService.update(req.params.id, req.body);
    res.json(doc);
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