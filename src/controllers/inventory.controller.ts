// inventory.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as inventoryService from '../services/inventory.service';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await inventoryService.findAll();
    res.json(docs);
  } catch (error) {
    next(error);
  }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await inventoryService.findById(req.params.id);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await inventoryService.create(req.body);
    res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await inventoryService.remove(req.params.id);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await inventoryService.update(req.params.id, req.body);
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