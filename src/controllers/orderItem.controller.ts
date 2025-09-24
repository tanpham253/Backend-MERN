// order_items.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as orderItemsService from '../services/ordersItem.service';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderItems = await orderItemsService.findAll();
    res.json(orderItems);
  } catch (error) {
    next(error);
  }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderItem = await orderItemsService.findById(req.params.id);
    res.json(orderItem);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderItem = await orderItemsService.create(req.body);
    res.status(201).json(orderItem);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await orderItemsService.remove(req.params.id);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await orderItemsService.update(req.params.id, req.body);
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