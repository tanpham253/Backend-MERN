// orders.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as ordersService from '../services/orders.service';
import sendJsonSuccess from '../helper/response.helper';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await ordersService.findAll();
    sendJsonSuccess(res, orders);
  } catch (error) {
    next(error);
  }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await ordersService.findById(req.params.id);
    sendJsonSuccess(res, order);
  } catch (error) {
    next(error);
  }
};

export const findByCustomerId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await ordersService.findByCustomerId(req.params.customer_id);
    sendJsonSuccess(res, orders);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await ordersService.create(req.body);
    sendJsonSuccess(res, order, "Order created successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await ordersService.remove(req.params.id);
    sendJsonSuccess(res, doc, "Order deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await ordersService.update(req.params.id, req.body);
    sendJsonSuccess(res, doc, "Order updated successfully");
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