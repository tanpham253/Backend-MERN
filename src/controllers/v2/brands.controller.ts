import { Request, Response } from "express";
import Brand from "../../models/brands.model";

const brandController = {
 
  async findAllV2(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const keyword = (req.query.keyword as string) || "";

      const filter = keyword
        ? { brand_name: { $regex: keyword, $options: "i" } }
        : {};

      const totalRecords = await Brand.countDocuments(filter);
      const brands = await Brand.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      res.status(200).json({
        statusCode: 200,
        message: "Success",
        data: {
          data: brands,
          totalRecords,
          limit,
          page,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        statusCode: 500,
        message: error.message || "Internal Server Error",
        data: null,
      });
    }
  },
};

export default brandController;
