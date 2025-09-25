import * as yup from 'yup';

const create = yup
  .object({
    body: yup.object({
      customer_id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'Customer ID must be a valid ObjectId'}).required(),
      product_id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'Product ID must be a valid ObjectId'}).required(),
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
      product_id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'Product ID must be a valid ObjectId'}).optional(),
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