// wishlist.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as wishlistService from '../services/wishlists.services';
import sendJsonSuccess from '../helper/response.helper';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wishlists = await wishlistService.findAll();
    sendJsonSuccess(res, wishlists);
  } catch (error) {
    next(error);
  }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wishlist = await wishlistService.findById(req.params.id);
    sendJsonSuccess(res, wishlist);
  } catch (error) {
    next(error);
  }
};

export const findByCustomerId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wishlists = await wishlistService.findByCustomerId(req.params.customer_id);
    sendJsonSuccess(res, wishlists);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wishlist = await wishlistService.create(req.body);
    sendJsonSuccess(res, wishlist, "Wishlist item created successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await wishlistService.remove(req.params.id);
    sendJsonSuccess(res, doc, "Wishlist item deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await wishlistService.update(req.params.id, req.body);
    sendJsonSuccess(res, doc, "Wishlist item updated successfully");
  } catch (error) {
    next(error);
  }
};

export default {
    findAll,
    findById,
    findByCustomerId,
    create,
    deleteById,
    updateById
};