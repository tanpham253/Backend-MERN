import createError from "http-errors";
import User from "../models/users.model";

const findAll = async (query: any) => {
  // safely convert query parameters
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const sort = query.sort === 'asc' ? 'asc' : 'desc';
  const keyword = query.keyword || null;
  const active = query.active;

  const filter: any = {};

  if (active !== undefined && active !== null) {
    filter.active = active === 'true'; // convert string to boolean
  }

  if (keyword) {
    filter.$or = [
      { first_name: new RegExp(keyword, 'i') },
      { last_name: new RegExp(keyword, 'i') },
      { email: new RegExp(keyword, 'i') },
    ];
  }

  const users = await User.find(filter)
    .sort({ createdAt: sort === 'asc' ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const totalRecords = await User.countDocuments(filter);

  return {
    users,
    page,
    limit,
    totalRecords,
  };
};

const findById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw createError(404, "User not found");
  return user;
};

const create = async (payload: any) => {
  const newUser = new User({
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    is_active: payload.is_active,
    password: payload.password,
  });
  await newUser.save();
  return newUser;
};

const updateById = async (id: string, payload: any) => {
  const user = await findById(id);
  Object.assign(user, payload);
  await user.save();
  return user;
};

const deleteById = async (id: string) => {
  const user = await findById(id);
  await User.findByIdAndDelete(user._id);
  return user;
};

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
