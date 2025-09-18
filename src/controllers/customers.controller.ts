import { NextFunction, Request, Response } from "express";
import customersService from "../services/customers.service";
import sendJsonSuccess from "../helper/response.helper";

// Hàm lấy tất cả khách hàng
const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customers = await customersService.findAll();
        sendJsonSuccess(res, customers);
    } catch (error) {
        next(error);
    }
};

// Hàm lấy khách hàng theo ID
const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const customer = await customersService.findById(id);
        sendJsonSuccess(res, customer);
    } catch (error) {
        next(error);
    }
};

// Hàm tạo mới khách hàng
const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = await customersService.create(req.body);
        sendJsonSuccess(res, customer);
    } catch (error) {
        next(error);
    }
};

// Hàm cập nhật khách hàng theo ID
const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const updatedCustomer = await customersService.updateById(id, req.body);
        sendJsonSuccess(res, updatedCustomer);
    } catch (error) {
        next(error);
    }
};

// Hàm xóa mềm khách hàng theo ID
const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const updatedCustomer = await customersService.updateById(id, { isDeleted: true });
        sendJsonSuccess(res, updatedCustomer);
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