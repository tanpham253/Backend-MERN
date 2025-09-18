import createError from "http-errors";
import Customer from "../models/customers.model";

const findAll = async () => {
  const customerDB = await Customer.find();
  return customerDB;
};

const findById = async (id: string) => {
  const customer = await Customer.findById(id);
  if (!customer) {
    throw createError(404, "Customer not found");
  }
  return customer;
};

const create = (payload: any) => {
  const newCustomer = new Customer({
    first_name: payload.first_name,
    last_name: payload.first_name,
    email: payload.first_name,
    password: payload.first_name,
    phone_number: payload.first_name,
  });
  newCustomer.save();
  return newCustomer;
};

const updateById = async (id: string, payload: any) => {
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
