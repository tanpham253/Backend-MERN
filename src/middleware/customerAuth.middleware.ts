import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import Customer from "../models/customers.model";
import { decodedJWT, verifyToken } from "../helper/customerToken.helper";


export const customerAuthenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Get the jwt token from the head
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log('<<=== 🚀 authHeader ===>>',authHeader);
  console.log('<<=== 🚀 token ===>>',token);

  //If token is not valid, respond with 401 (unauthorized)
  if (!token) {
    return next(createError(401, "Unauthorized"));
  }

  try {
    const decoded = verifyToken(token) as decodedJWT;

    console.log('<<=== 🚀 decoded ===>>',decoded);
    //Kiểm tra xem thông tin chứa trong token có hợp lệ không
    const customer = await Customer.findById(decoded.id);

    if (!customer) {
      return next(createError(401, "Unauthorized"));
    }
    //Đăng ký biến customer global trong app
    res.locals.customer = customer;

    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return next(createError(403, "Forbidden"));
  }
};


// export const authRoles = (roles: string[] = []) => {
//     // roles param can be a single role string (e.g. Role.Customer or 'Customer') 
//     // or an array of roles (e.g. [Role.Admin, Role.Customer] or ['Admin', 'Customer'])
//     if (typeof roles === 'string') {
//         roles = [roles];
//     }

//     return (req: Request, res: Response, next: NextFunction) => {
//       if (roles.length && res.locals.customer.roles && !res.locals.customer.roles.some((role: string) => roles.includes(role))) {
//         return next(createError(403, 'Forbidden'));
//       }
//         // authentication and authorization successful
//         next();
//     }
// }