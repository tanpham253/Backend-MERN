// cart.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as cartService from '../services/carts.services.service';
import sendJsonSuccess from '../helper/response.helper';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carts = await cartService.findAll();
    sendJsonSuccess(res, carts);
  } catch (error) {
    next(error);
  }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await cartService.findById(req.params.id);
    sendJsonSuccess(res, cart);
  } catch (error) {
    next(error);
  }
};

export const findByCustomerId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carts = await cartService.findByCustomerId(req.params.customer_id);
    sendJsonSuccess(res, carts);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await cartService.create(req.body);
    sendJsonSuccess(res, cart, "Cart created successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await cartService.remove(req.params.id);
    sendJsonSuccess(res, doc, "Cart deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await cartService.update(req.params.id, req.body);
    sendJsonSuccess(res, doc, "Cart updated successfully");
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