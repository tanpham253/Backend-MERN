import { NextFunction, Request, Response } from "express";
import customerService from "../services/customers.service";
import sendJsonSuccess from "../helper/response.helper";

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customers = await customerService.findAll(req.query);
        sendJsonSuccess(res, customers);
    } catch (error) {
        next(error);
    }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const customer = await customerService.findById(id);
        sendJsonSuccess(res, customer);
    } catch (error) {
        next(error);
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = await customerService.create(req.body);
        sendJsonSuccess(res, customer, 'Customer created successfully', 201);
    } catch (error) {
        next(error);
    }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const customer = await customerService.updateById(id, req.body);
        sendJsonSuccess(res, customer, 'Customer updated successfully');
    } catch (error) {
        next(error);
    }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const customer = await customerService.deleteById(id);
        sendJsonSuccess(res, customer, 'Customer deleted successfully');
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokens = await customerService.verifyUserByCredentials({
        email: req.body.email,
        password: req.body.password,
    });
    sendJsonSuccess(res, tokens, "Login successfully");
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //Sau khi authenticateToken middleware đã xác thực token và lưu customer vào res.locals.customer
        //Chúng ta có thể lấy customer từ res.locals.customer
        const customer = res.locals.customer;
        // Gọi service để làm mới token dựa vào customer
        const tokens = await customerService.refreshToken(customer);
        sendJsonSuccess(res, tokens, "Refresh token successfully");
    } catch (error) {
        next(error);
    }
};


const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //Sau khi authenticateToken middleware đã xác thực token và lưu customer vào res.locals.customer
        //Chúng ta có thể lấy customer từ res.locals.customer
        const customer = res.locals.customer;
        
        sendJsonSuccess(res, customer, "Successfully");
    } catch (error) {
        next(error);
    }
};

export const checkEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const exists = await customerService.checkEmailExists(email as string);
    res.status(200).json({ exists });
  } catch (err) {
    next(err);
  }
};

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    login,
    refreshToken,
    getProfile,
    checkEmail
};