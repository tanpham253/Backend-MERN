// wishlist.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as wishlistService from '../services/wishlists.services';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wishlists = await wishlistService.findAll();
    res.json(wishlists);
  } catch (error) {
    next(error);
  }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wishlist = await wishlistService.findById(req.params.id);
    res.json(wishlist);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wishlist = await wishlistService.create(req.body);
    res.status(201).json(wishlist);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await wishlistService.update(req.params.id, req.body);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await wishlistService.remove(req.params.id);
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