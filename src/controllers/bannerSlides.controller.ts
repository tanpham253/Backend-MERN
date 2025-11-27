import { Request, Response, NextFunction } from 'express';
import bannerSlidesService from '../services/bannerSlides.service';
import sendJsonSuccess from '../helper/response.helper';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const banners = await bannerSlidesService.findAll(req.query);
    sendJsonSuccess(res, banners);
  } catch (error) {
    next(error);
  }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const banner = await bannerSlidesService.findById(req.params.id);
    sendJsonSuccess(res, banner);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const banner = await bannerSlidesService.create(req.body);
    sendJsonSuccess(res, banner, 'Banner slide created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const banner = await bannerSlidesService.updateById(req.params.id, req.body);
    sendJsonSuccess(res, banner, 'Banner slide updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const banner = await bannerSlidesService.deleteById(req.params.id);
    sendJsonSuccess(res, banner, 'Banner slide deleted successfully');
  } catch (error) {
    next(error);
  }
};

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
