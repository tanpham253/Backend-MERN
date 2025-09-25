import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { IUsers } from "../models/users.model";

// Middleware to check if user can access customer resources
export const canAccessCustomerResource = (resourceCustomerIdField: string = 'customer_id') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user as IUsers;
      
      // Admin and superadmin can access all resources
      if (user.roles.includes('admin') || user.roles.includes('superadmin')) {
        return next();
      }

      // For regular users, check if they're accessing their own resources
      const resourceCustomerId = req.params.customer_id || req.body[resourceCustomerIdField];
      
      if (!resourceCustomerId) {
        return next(createError(400, "Customer ID is required"));
      }

      // Check if the authenticated user is the owner of the resource
      if (user._id.toString() !== resourceCustomerId.toString()) {
        return next(createError(403, "Access denied. You can only access your own resources"));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

// Middleware to check if user can access specific customer profile
export const canAccessCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user as IUsers;
    const customerId = req.params.id;
    
    // Admin and superadmin can access all customer profiles
    if (user.roles.includes('admin') || user.roles.includes('superadmin')) {
      return next();
    }

    // Regular users can only access their own profile
    if (user._id.toString() !== customerId.toString()) {
      return next(createError(403, "Access denied. You can only access your own profile"));
    }

    next();
  } catch (error) {
    next(error);
  }
};