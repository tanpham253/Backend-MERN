// users.service.ts
import Users from '../models/users.model';

export const findAll = async (query: any) => {
  const {
    page = 1,
    limit = 5,
    sort = 'desc',
    keyword = null,
    active = null
  } = query;
  const filter: any = {};
  if (active) {
    filter.active = query.active === 'true'; // convert string to boolean
  }
  // filter 3 field at once
  if (keyword) {
    filter.$or = [
      { first_name: new RegExp(keyword, 'i')},
      { last_name: new RegExp(keyword, 'i')},
      { email: new RegExp(keyword, 'i')}
    ]
  }
  return await Users
  .find({ ...filter })
  .sort(
    {
      createdAt: sort === 'asc' ? 1 :-1
    }
  )
  .skip((page - 1) * limit)
  .limit(limit);
};

export const findById = async (id: string) => {
  return await Users.findById(id);
};

export const create = async (data: any) => {
  const doc = new Users(data);
  return await doc.save();
};

export const updateById = async (id: string, payload: any) => {
  // find the document by id
  const user = await Users.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  // update fields
  Object.assign(user, payload);

  // console.log('<<=== 🚀 updateById staff ===>>', user);

  // save the updated document
  await user.save();
  return user;
};

export const deleteById = async (id: string) => {
  return await Users.findByIdAndDelete(id);
};
