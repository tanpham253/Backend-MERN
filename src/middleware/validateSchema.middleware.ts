import {AnySchema, ValidationError} from 'yup';
import { NextFunction, Request, Response } from 'express';

export const validateSchemaYup = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // console.log("📌 Incoming body:", JSON.stringify(req.body, null, 2));
    // console.log("Schema validating keys:", Object.keys(req.body));
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    }, 
    { 
      abortEarly: false, // abortEarly: false để lấy tất cả lỗi thay vì chỉ lấy lỗi đầu tiên
    }  
  );

  next();

  } catch (err) {
      // 🚀 Pass the error forward — no response here
      return next(err);
    }
  };
