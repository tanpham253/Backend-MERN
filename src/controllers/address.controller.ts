import { Request, Response, NextFunction } from 'express';
import * as addressService from '../services/address.service';
import sendJsonSuccess from '../helper/response.helper';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await addressService.findAll();
    sendJsonSuccess(res, docs);
  } catch (error) {
    next(error);
  }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await addressService.findById(req.params.id);
    sendJsonSuccess(res, doc);
  } catch (error) {
    next(error);
  }
};

export const findByCustomerId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const addresses = await addressService.findByCustomerId(req.params.customer_id);
    sendJsonSuccess(res, addresses);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await addressService.create(req.body);
    sendJsonSuccess(res, doc, "Address created successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await addressService.remove(req.params.id);
    sendJsonSuccess(res, doc, "Address deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await addressService.update(req.params.id, req.body);
    sendJsonSuccess(res, doc, "Address updated successfully");
  } catch (error) {
    next(error);
  }
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
  findByCustomerId
};
