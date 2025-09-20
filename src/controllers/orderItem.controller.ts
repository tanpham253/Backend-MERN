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

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderItem = await orderItemsService.update(req.params.id, req.body);
    res.json(orderItem);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await orderItemsService.remove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
