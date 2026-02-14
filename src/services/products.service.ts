import createError from "http-errors";
import Product from "../models/products.model";
import Category from "../models/categories.model";
import Order from "../models/orders.model";

/* BEGIN PUBLIC SERVICE */

const findBestSellerProducts = async ({
  limit = 6,
  page = 1,
}: {
  limit?: number;
  page?: number;
}) => {
  const skip = (page - 1) * limit;

  // Aggregate total quantity sold per product from Order documents
  const bestSellerStats = await Order.aggregate([
    { $match: { isDelete: false, order_status: { $ne: 3 } } }, // exclude deleted/rejected
    { $unwind: "$order_items" },
    {
      $group: {
        _id: "$order_items.product_id",
        totalSold: { $sum: "$order_items.quantity" },
      },
    },
    { $sort: { totalSold: -1 } },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
    {
      $project: {
        _id: "$product._id",
        product_name: "$product.product_name",
        thumbnail: "$product.thumbnail",
        price: "$product.price",
        discount: "$product.discount",
        discountedPrice: {
          $round: [
            {
              $subtract: [
                "$product.price",
                {
                  $multiply: [
                    "$product.price",
                    { $divide: ["$product.discount", 100] },
                  ],
                },
              ],
            },
            2,
          ],
        },
        stock: "$product.stock",
        totalSold: 1,
        category_id: "$product.category_id",
        brand_id: "$product.brand_id",
        star_number: "$product.star_number",
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);

  const totalRecords = await Order.aggregate([
    { $match: { isDelete: false, order_status: { $ne: 3 } } },
    { $unwind: "$order_items" },
    {
      $group: {
        _id: "$order_items.product_id",
      },
    },
    { $count: "count" },
  ]);

  return {
    products: bestSellerStats,
    page,
    limit,
    totalRecords: totalRecords[0]?.count || bestSellerStats.length,
  };
};

const findHomeProducts = async ({
  catId,
  limit = 5,
}: {
  catId: string;
  limit: number;
}) => {
  const products = await Product.find({
    category_id: catId,
  })
    .select("-createdAt -updatedAt -description")
    .limit(limit)
    .populate("category_id", "category_name")
    .populate("brand_id", "brand_name");
  // console.log('<<=== 🚀 products Service ===>>', products);
  // console.log('<<=== 🚀 products Service ===>>', products);
  return products;
};

// for home page - new arrivals
const findLatestProducts = async ({ limit = 8 }: { limit: number }) => {
  const products = await Product.find({})
    .sort({ updatedAt: -1 }) // newest first
    .limit(limit)
    .select("-description") // omit heavy fields ???
    .populate("category_id", "category_name slug")
    .populate("brand_id", "brand_name");

  // console.log("<<=== 🚀 Latest Products Service ===>>", products);
  return products;
};

const pageFindProducts = async ({
  limit = 12,
  page = 1,
  categorySlug,
  sortBy = "latest",
  minPrice,
  maxPrice,
  search,
}: {
  limit?: number;
  page?: number;
  categorySlug?: string;
  sortBy?: "latest" | "oldest" | "priceAsc" | "priceDesc" | "discount";
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}) => {
  console.log("<<=== 🚀 pageFindProducts begin ===>>");
  const skip = (page - 1) * limit;
  const filter: any = {};

  // Filter by category slug
  if (categorySlug) {
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return { products: [], page, limit, totalRecords: 0 };
    }
    filter.category_id = category._id;
  }

  if (search) {
    filter.product_name = { $regex: search, $options: "i" };
  }

  // Fetch products from DB
  const products = await Product.find(filter)
    .sort({ updatedAt: -1 }) // newest first
    .skip(skip)
    .limit(limit * 3) // fetch more to allow post-filtering (optional)
    .select("-description")
    .populate("category_id", "category_name slug")
    .populate("brand_id", "brand_name")
    .lean();

  // Add discountedPrice manually
  let productsWithDiscount = products.map((p) => ({
    ...p,
    discountedPrice: p.price - (p.price * p.discount) / 100,
  }));

  // Apply discounted price range filtering
  if (minPrice !== undefined && maxPrice !== undefined) {
    productsWithDiscount = productsWithDiscount.filter(
      (p) => p.discountedPrice >= minPrice && p.discountedPrice <= maxPrice
    );
  } else if (minPrice !== undefined) {
    productsWithDiscount = productsWithDiscount.filter(
      (p) => p.discountedPrice >= minPrice
    );
  } else if (maxPrice !== undefined) {
    productsWithDiscount = productsWithDiscount.filter(
      (p) => p.discountedPrice <= maxPrice
    );
  }

  // Sorting (after computation)
  if (sortBy === "oldest") {
    productsWithDiscount.sort(
      (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    );
  } else if (sortBy === "priceAsc") {
    productsWithDiscount.sort((a, b) => a.discountedPrice - b.discountedPrice);
  } else if (sortBy === "priceDesc") {
    productsWithDiscount.sort((a, b) => b.discountedPrice - a.discountedPrice);
  } else if (sortBy === "discount") {
    productsWithDiscount.sort((a, b) => b.discount - a.discount);
  } else {
    // latest (default)
    productsWithDiscount.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  // Paginate again after filtering
  const totalRecords = productsWithDiscount.length;
  const paginatedProducts = productsWithDiscount.slice(0, limit);

  const totalPages = Math.ceil(totalRecords / limit);

  return {
    products: paginatedProducts,
    page,
    limit,
    totalRecords,
    totalPages,
  };
};

const getProductsByCategorySlug = async (cate_slug: string, query: any) => {
  console.log("<<=== 🚀 query ===>>", query);
  const {
    page = 1,
    limit = 5,
    keyword = null,
    sort_type = "desc",
    sort_by = "createdAt",
    brand_id = null,
  } = query;

  // Truy vấn category để lấy _id từ slug
  const category = await Category.findOne({ slug: cate_slug });
  if (!category) {
    return { products: [], page, limit, totalRecords: 0 };
  }

  console.log("<<=== 🚀 category ===>>", category);

  let sortObject = {};
  sortObject = { ...sortObject, [sort_by]: sort_type === "desc" ? -1 : 1 };

  let where = {};
  if (keyword) {
    where = { ...where, product_name: { $regex: keyword, $options: "i" } };
  }
  if (brand_id) {
    where = { ...where, brand_id };
  }

  const skip = (page - 1) * limit;
  const products = await Product.find({
    ...where,
    category_id: category._id,
  })
    .skip(skip)
    .limit(limit)
    .sort(sortObject)
    .populate("category_id", "category_name slug")
    .populate("brand_id", "brand_name");

  const totalRecords = await Product.countDocuments({
    ...where,
    category_id: category._id,
  });

  return {
    products,
    page,
    limit,
    totalRecords,
  };
};

/* END PUBLIC SERVICE */

const findAll = async (query: any) => {
  console.log("<<=== 🚀 query ===>>", query);
  const {
    page = 1,
    limit = 5,
    keyword = null,
    sort_type = "desc",
    sort_by = "createdAt",
    cat_id = null,
    brand_id = null,
  } = query;

  let sortObject: { [key: string]: 1 | -1 } = {
    [sort_by as string]: sort_type === "desc" ? -1 : 1,
  };

  const where: any = {};
  if (keyword) {
    where.product_name = { $regex: keyword, $options: "i" };
  }
  if (cat_id) {
    where.category_id = cat_id;
  }
  if (brand_id) {
    where.brand_id = brand_id;
  }

  const skip = (page - 1) * limit;

  const [products, totalRecords] = await Promise.all([
    Product.find(where)
      .skip(skip)
      .limit(limit)
      .sort(sortObject)
      .populate("category_id", "category_name")
      .populate("brand_id", "brand_name"),
    Product.countDocuments(where),
  ]);

  return { products, page, limit, totalRecords };
};

const findById = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw createError(400, "Product not found");
  }
  return product;
};

const create = async (payload: any) => {
  const newProduct = new Product({
    product_name: payload.product_name,
    description: payload.description,
    price: payload.price,
    discount: payload.discount,
    stock: payload.stock,
    model_year: payload.model_year,
    category_id: payload.category_id,
    brand_id: payload.brand_id,
    slug: payload.slug,
    thumbnail: payload.thumbnail, //uploads/bi-1755776296973.png
  });
  newProduct.save();
  return newProduct;
};

const updateById = async (id: string, payload: any) => {
  const product = await findById(id);
  Object.assign(product, payload);
  await product.save();
  return product;
};

const deleteById = async (id: string) => {
  const product = await findById(id);
  await Product.findByIdAndDelete(product._id);
  return product;
};

const findBySlug = async (slug: string) => {
  const product = await Product.findOne({ slug })
    .populate("category_id", "category_name slug")
    .populate("brand_id", "brand_name");

  if (!product) {
    throw createError(404, "Product not found");
  }

  return product;
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
  findHomeProducts,
  getProductsByCategorySlug,
  findBySlug,
  findLatestProducts,
  findBestSellerProducts,
  pageFindProducts,
};
