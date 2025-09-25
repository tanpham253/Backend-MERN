// address.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as addressService from '../services/address.service';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await addressService.findAll();
    res.json(docs);
  } catch (error) {
    next(error);
  }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await addressService.findById(req.params.id);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const findByCustomerId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const addresses = await addressService.findByCustomerId(req.params.customer_id);
    res.json(addresses);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await addressService.create(req.body);
    res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await addressService.remove(req.params.id);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await addressService.update(req.params.id, req.body);
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