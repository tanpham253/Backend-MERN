import * as yup from 'yup';

const create = yup
  .object({
    body: yup.object({
      customer_id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'Customer ID must be a valid ObjectId'}).required(),
      order_items: yup.array().of(yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'Order item ID must be a valid ObjectId'})).optional(),
      shipment_id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'Shipment ID must be a valid ObjectId'}).optional(),
      discount_id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'Discount ID must be a valid ObjectId'}).optional(),
      payment_id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'Payment ID must be a valid ObjectId'}).optional(),
      status: yup.string().min(2).max(50).required(),
      total_amount: yup.number().min(0).required(),
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
      order_items: yup.array().of(yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'Order item ID must be a valid ObjectId'})).optional(),
      shipment_id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'Shipment ID must be a valid ObjectId'}).optional(),
      discount_id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'Discount ID must be a valid ObjectId'}).optional(),
      payment_id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'Payment ID must be a valid ObjectId'}).optional(),
      status: yup.string().min(2).max(50).optional(),
      total_amount: yup.number().min(0).optional(),
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