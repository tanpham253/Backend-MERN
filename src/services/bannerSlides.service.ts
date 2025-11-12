import createError from 'http-errors';
import BannerSlide from '../models/bannerSlides.model';

interface QueryParams {
  page?: number | string;
  limit?: number | string;
  keyword?: string | null;
  is_active?: string;
  sort_by?: string;
  sort_type?: 'asc' | 'desc';
}

const parseBoolean = (value?: string) => {
  if (value === undefined) {
    return undefined;
  }
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  return undefined;
};

const findAll = async (query: QueryParams) => {
  const page = Number(query.page) > 0 ? Number(query.page) : 1;
  const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
  const keyword = query.keyword ?? null;
  const isActiveFilter = parseBoolean(query.is_active);
  const sortBy = query.sort_by || 'order';
  const sortType = query.sort_type === 'desc' ? -1 : 1;

  const where: Record<string, unknown> = {};

  if (keyword) {
    where.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ];
  }

  if (typeof isActiveFilter === 'boolean') {
    where.is_active = isActiveFilter;
  }

  const skip = (page - 1) * limit;

  const [items, totalRecords] = await Promise.all([
    BannerSlide.find(where)
      .sort({ [sortBy]: sortType, createdAt: -1 })
      .skip(skip)
      .limit(limit),
    BannerSlide.countDocuments(where),
  ]);

  return {
    data: items,
    page,
    limit,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit) || 1,
  };
};

const findById = async (id: string) => {
  const banner = await BannerSlide.findById(id);
  if (!banner) {
    throw createError(404, 'Banner slide not found');
  }
  return banner;
};

const create = async (payload: any) => {
  const banner = await BannerSlide.create(payload);
  return banner;
};

const updateById = async (id: string, payload: any) => {
  const banner = await BannerSlide.findByIdAndUpdate(id, payload, { new: true });
  if (!banner) {
    throw createError(404, 'Banner slide not found');
  }
  return banner;
};

const deleteById = async (id: string) => {
  const banner = await BannerSlide.findByIdAndDelete(id);
  if (!banner) {
    throw createError(404, 'Banner slide not found');
  }
  return banner;
};

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
