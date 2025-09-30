import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { IUsers } from "../models/users.model";
import Address from "../models/address.model";
import Cart from "../models/carts.model";
import Order from "../models/orders.model";
import Wishlist from "../models/wishlists.model";

// Generic ownership checker for customer resources
export const checkCustomerOwnership = (resourceType: 'address' | 'cart' | 'order' | 'wishlist') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user as IUsers;
      const resourceId = req.params.id;
      const customerId = req.params.customer_id;

      // Admin and admin can access all resources
      if (user.roles.includes("admin") || user.roles.includes("admin")) {
        return next();
      }

      let resource: any = null;
      let ownerField = 'customer_id';

      // Get the resource based on type
      switch (resourceType) {
        case 'address':
          resource = await Address.findById(resourceId);
          break;
        case 'cart':
          resource = await Cart.findById(resourceId);
          break;
        case 'order':
          resource = await Order.findById(resourceId);
          break;
        case 'wishlist':
          resource = await Wishlist.findById(resourceId);
          break;
      }

      // Check if resource exists
      if (!resource) {
        return next(createError(404, `${resourceType.charAt(0).toUpperCase() + resourceType.slice(1)} not found`));
      }

      // Check ownership - user can only access their own resources
      if (user.id.toString() !== resource[ownerField].toString()) {
        return next(createError(403, `Access denied. You can only access your own ${resourceType}`));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

// Check ownership by customer_id parameter (for listing resources)
export const checkCustomerIdOwnership = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user as IUsers;
      const customerId = req.params.customer_id;

      // Admin and admin can access all customer resources
      if (user.roles.includes("admin") || user.roles.includes("admin")) {
        return next();
      }

      // Regular user can only access their own resources
      if (user.id.toString() !== customerId) {
        return next(createError(403, "Access denied. You can only access your own resources"));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

// Check ownership for creating resources (customer_id in body)
export const checkCustomerCreateOwnership = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user as IUsers;
      const customerId = req.body.customer_id;

      // Admin and admin can create resources for any customer
      if (user.roles.includes("admin") || user.roles.includes("admin")) {
        return next();
      }

      // Regular user can only create resources for themselves
      if (user.id.toString() !== customerId) {
        return next(createError(403, "Access denied. You can only create resources for yourself"));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};