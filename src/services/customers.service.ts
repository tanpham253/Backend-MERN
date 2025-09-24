import createError from "http-errors";
import Customer from "../models/customers.model";

const saltRounds = 10;

const findAll = async () => {
  const customerDB = await Customer.find()
    .populate('address_id', 'city district ward street');
  return customerDB;
};

const findById = async (id: string) => {
  const customer = await Customer.findById(id)
    .populate('address_id', 'city district ward street');
  if (!customer) {
    throw createError(404, "Customer not found");
  }
  return customer;
};

const create = (payload: any) => {
  // hash password with bcrypt
  // const hashedPassword = bcrypt.hashSync(payload.password, saltRounds)

  const newCustomer = new Customer({
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    password: payload.password,
    phone_number: payload.phone_number,
  });
  newCustomer.save();
  return newCustomer;
};

const updateById = async (id: string, payload: any) => {
  // hash password if not null
  //   if (payload.password) {
  //   const saltRounds = 10;
  //   payload.password = await bcrypt.hash(payload.password, saltRounds);
  // }
    // https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
  const updatedCustomer = await Customer.findByIdAndUpdate(id, payload, {
    new: true, // return modified instead
    runValidators: true,
  });
  if (!updatedCustomer) {
    throw createError(404, "Customer not found");
  }
  return updatedCustomer;
};

const deleteById = async (id: string) => {
  const deleteCustomer = await Customer.findByIdAndDelete(id);
  if (!deleteCustomer) {
    throw createError(404, "Customer not found");
  }
  return deleteCustomer;
};

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
