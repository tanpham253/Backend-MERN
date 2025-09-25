// New middleware to check ownership by address id
import createError from "http-errors";
import Address from "../models/address.model";
import { IUsers } from "../models/users.model";
import { Request, Response, NextFunction } from "express";

export const canAccessAddressById = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user as IUsers;
      const addressId = req.params.id;

      const address = await Address.findById(addressId);
      if (!address) {
        return next(createError(404, "Address not found"));
      }

      // Admins & superadmins can delete any address
      if (user.roles.includes("admin") || user.roles.includes("superadmin")) {
        return next();
      }

      // Regular user can only delete their own address
      if (user.id.toString() !== address.customer_id.toString()) {
        return next(createError(403, "Access denied. You can only delete your own address"));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
