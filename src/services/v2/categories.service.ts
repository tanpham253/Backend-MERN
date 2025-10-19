import Category from "../../models/categories.model";

interface CategoryQuery {
  page?: number;
  limit?: number;
  keyword?: string;
  sort_by?: string;
  sort_type?: "asc" | "desc";
}

const findAll = async (query: CategoryQuery) => {
  // Extract query params with defaults
  const {
    page = 1,
    limit = 10,
    keyword = "",
    sort_by = "createdAt",
    sort_type = "desc",
  } = query;

  const currentPage = Number(page);
  const perPage = Number(limit);

  // Build filter (search by category name or description)
  const filter: any = {};
  if (keyword) {
    filter.$or = [
      { category_name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }

  // Sorting
  const sort: any = { [sort_by]: sort_type === "asc" ? 1 : -1 };

  // Query
  const totalItems = await Category.countDocuments(filter);
  const categories = await Category.find(filter)
    .sort(sort)
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
    .lean();

  return {
    data: categories,
    pagination: {
      total: totalItems,
      page: currentPage,
      limit: perPage,
      totalPages: Math.ceil(totalItems / perPage),
    },
  };
};

const findById = async (id: string) => {
  return await Category.findById(id);
};

const create = async (data: any) => {
  return await Category.create(data);
};

const updateById = async (id: string, data: any) => {
  return await Category.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = async (id: string) => {
  return await Category.findByIdAndDelete(id);
};

const getCategoryTree = async () => {
  // Example: if you have parent-child category logic
  const allCategories = await Category.find().lean();
  return allCategories;
};

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
  getCategoryTree,
};
