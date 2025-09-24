import { NextFunction, Request, Response } from "express";

export const routeCustomerExample = (req: Request,res: Response,next: NextFunction) => {
    console.log('routeCustomerMiddleware is runing...');
    next(); // countine
}