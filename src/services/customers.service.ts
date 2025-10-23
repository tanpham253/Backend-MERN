import createError from "http-errors";
import Customer, { ICustomers } from "../models/customers.model";
import bcrypt from 'bcrypt'
import { generateToken } from "../helper/customerToken.helper";

const findAll = async (query: any) => {
  console.log('<<=== 🚀 query ===>>',query);
  const { page = 1, limit = 5, keyword = null, sort_type = 'desc', sort_by='createdAt' } = query;

  console.log('<<=== 🚀 keyword ===>>',keyword);

  let sortObject = {};
    sortObject = { ...sortObject, [sort_by]: sort_type === 'desc' ? -1 : 1 };

  const where: any = {};
  //Nếu cần lọc thì đưa vào where
  if(keyword) {
    where.$or = [
      { first_name: { $regex: keyword, $options: 'i' } },
      { last_name: { $regex: keyword, $options: 'i' } },
      { email: { $regex: keyword, $options: 'i' } },
      { phone: { $regex: keyword, $options: 'i' } }
    ];
  }

  const skip = (page - 1) * limit;
  const customers = await Customer.find({
    ...where,
    isDelete: false
  })
    .skip(skip)
    .limit(limit)
    .sort({...sortObject});
  return {
    customers,
    page,
    limit,
    totalRecords: await Customer.countDocuments({ isDelete: false }),
  };
};

const findById = async (id: string) => {
  const customer = await Customer.findById(id);
  if (!customer || customer.isDelete) {
    throw createError(400, "Customer not found");
  }
  return customer;
};

const create = (payload: any) => {
  const newCustomer = new Customer({
    first_name: payload.first_name,
    last_name: payload.last_name,
    phone: payload.phone,
    email: payload.email,
    street: payload.street,
    city: payload.city,
    state: payload.state,
    zip_code: payload.zip_code,
    password: payload.password,
    active: payload.active || true,
  });
  newCustomer.save();
  return newCustomer;
};

const updateById = async (id: string, payload: any) => {
  const customer = await findById(id);
  Object.assign(customer, payload);
  await customer.save();
  return customer;
};

const deleteById = async (id: string) => {
  const customer = await findById(id);
  // Soft delete - chỉ update isDelete = true
  customer.isDelete = true;
  await customer.save();
  return customer;
};

const verifyUserByCredentials = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    //b1. Tìm kiếm người dùng theo email
    const customer = await Customer.findOne({ email });
    if (!customer) {
        throw createError(400, "Email or password is invalid");
    }
    //b2. So sánh password
    const passwordHash = customer.password;
    if (!passwordHash) {
        //Đừng thông báo: Sai mật mật khẩu. Hãy thông báo chung chung
        throw createError(400, "Invalid email or password")
    }
    const isValid = await bcrypt.compare(password, passwordHash); // true
    if(!isValid){
        //Đừng thông báo: Sai mật mật khẩu. Hãy thông báo chung chung
        throw createError(400, "Invalid email or password")
    }
    //b3. Nếu thành công, trả về tokens
    console.log('<<=== 🚀 customer ===>>',customer);
    const tokens = generateToken({
        id: customer._id,
        email: customer.email,
        // roles: customer.roles,
    })
    return tokens;
}


const refreshToken = async (customer: ICustomers) => {
    const tokens = generateToken({
        id: customer._id,
        email: customer.email,
        // roles: customer.roles,
    });
    return tokens;
}

const getProfile =  async(customer: ICustomers)=>{
    return customer
}


export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
  verifyUserByCredentials,
  refreshToken,
  getProfile
};