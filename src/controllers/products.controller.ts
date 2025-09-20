import { NextFunction, Request, Response } from "express";
import productsService from "../services/products.service";
import sendJsonSuccess from "../helper/response.helper";

// Hàm lấy tất cả sản phẩm
const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productsService.findAll();
        sendJsonSuccess(res, products);
    } catch (error) {
        next(error);
    }
};

// Hàm lấy sản phẩm theo ID
const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await productsService.findById(id);
        sendJsonSuccess(res, product);
    } catch (error) {
        next(error);
    }
};

// Hàm tạo mới sản phẩm
const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productsService.create(req.body);
        sendJsonSuccess(res, product);
    } catch (error) {
        next(error);
    }
};

// Hàm cập nhật sản phẩm theo ID
const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productsService.updateById(id, req.body);
        sendJsonSuccess(res, updatedProduct);
    } catch (error) {
        next(error);
    }
};

// Hàm xóa mềm sản phẩm theo ID
const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productsService.deleteById(id);
        sendJsonSuccess(res, updatedProduct);
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