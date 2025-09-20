// roles.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as rolesService from '../services/roles.service';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await rolesService.findAll();
    res.json(docs);
  } catch (error) {
    next(error);
  }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await rolesService.findById(req.params.id);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await rolesService.create(req.body);
    res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await rolesService.update(req.params.id, req.body);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await rolesService.remove(req.params.id);
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