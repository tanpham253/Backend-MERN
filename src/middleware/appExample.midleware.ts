import { NextFunction, Request, Response } from "express";

export const appExample = (req: Request,res: Response,next: NextFunction) => {
    console.log('exampleMiddleware is runing...');
    next(); // countine
}