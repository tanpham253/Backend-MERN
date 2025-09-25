import * as yup from 'yup';

const create = yup
  .object({
    body: yup.object({
      customer_id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'Customer ID must be a valid ObjectId'}).required(),
      city: yup.string().min(2).max(100).optional(),
      district: yup.string().min(2).max(100).optional(),
      ward: yup.string().min(2).max(100).optional(),
      street: yup.string().min(2).max(200).optional(),
    }),
  })
  .required();

const findById = yup
  .object({
    params: yup.object({
      id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID must be a valid ObjectId'}).required(),
    }),
  })
  .required();

const updateById = yup
  .object({
    params: yup.object({
      id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID must be a valid ObjectId'}).required(),
    }),
    body: yup.object({
      city: yup.string().min(2).max(100).optional(),
      district: yup.string().min(2).max(100).optional(),
      ward: yup.string().min(2).max(100).optional(),
      street: yup.string().min(2).max(200).optional(),
    })
  })
  .required();

const deleteById = yup
  .object({
    params: yup.object({
      id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID must be a valid ObjectId'}).required(),
    }),
  })
  .required();

const findByCustomerId = yup
  .object({
    params: yup.object({
      customer_id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'Customer ID must be a valid ObjectId'}).required(),
    }),
  })
  .required();

export default {
  create,
  findById,
  updateById,
  deleteById,
  findByCustomerId
};