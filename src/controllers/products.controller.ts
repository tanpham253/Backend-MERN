import { NextFunction, Request, Response } from "express";
import productsService from "../services/products.service";
import sendJsonSuccess from "../helper/response.helper";

const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
    try {
       
        sendJsonSuccess(res, [], 'Product uploaded successfully');
    } catch (error) {
        next(error);
    }
};

const getProductsByCategorySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productsService.getProductsByCategorySlug(req.params.slug, req.query);
        sendJsonSuccess(res, products);
    } catch (error) {
        next(error);
    }
};

const findHomeProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productsService.findHomeProducts({
            catId: req.params.catId,
            limit: req.query.limit ? parseInt(req.query.limit as string) : 5
        });
        console.log('<<=== 🚀 products Controller ===>>', req.params.catId);
        console.log('<<=== 🚀 products Controller ===>>', products);
        sendJsonSuccess(res, products);
    } catch (error) {
        next(error);
    }
};

// Hàm lấy tất cả sản phẩm
const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productsService.findAll(req.query);
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
    updateById,
    uploadSingle,
    findHomeProducts,
    getProductsByCategorySlug
};