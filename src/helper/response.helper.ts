import { Response } from "express";

const sendJsonSuccess = (res: Response, data?: any,message?: string, statusCode?: number) => {
    const status = statusCode || 200;
    const messageText = message || 'Success';

    res.status(status).json({
    statusCode: status,
    message: messageText,
    data
  });
};

export default sendJsonSuccess;