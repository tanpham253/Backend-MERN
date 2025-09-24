import * as yup from 'yup';
// because yup don't have default export

const findAll = yup
  .object({
    query: yup.object({
      page: yup.number().min(1).default(1),
      limit: yup.number().min(1).max(100).default(5),
      sort: yup.string().oneOf(['asc', 'desc']).default('desc'),
      keyword: yup.string().optional().default(null),
      active: yup.string().optional().default(null),
    }),
  })
  .required();

const create = yup
  .object({
    body: yup.object({
      product_name: yup.string().min(2).max(50).required(),
      description: yup.string().min(2).max(50).required(),
      slug: yup.string().matches(/^[A-Za-z0-9-_]{2,50}$/, {message: 'Only letters, numbers, dashes, and underscores, 2-50'}).required(),
      sku: yup.string().matches(/^[A-Za-z0-9]{12,50}$/, {message: 'must be alphanumeric, 12-50'}).required(),
      price: yup.number().min(0.01, 'must be greater than 0.01').required(),
      stock: yup.number().min(0,'must be greater than 0').optional().default(0),
      image_url: yup.string().min(2).max(100).optional().default(null),
      isDeleted: yup.boolean().optional().default(false),
    }),
  })
  .required();

const findById = yup
  .object({
    params: yup.object({
        id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID is non-Objectid'}).required(),
    }),
  })
  .required();

const updateById = yup
  .object({
    params: yup.object({
        id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID is non-Objectid'}).required(),
    }),
    body: yup.object({
        product_name: yup.string().min(2).max(50).required(),
        description: yup.string().min(2).max(50).required(),
        slug: yup.string().matches(/^[A-Za-z0-9-_]{2,50}$/, {message: 'Only letters, numbers, dashes, and underscores, 2-50'}).required(),
        sku: yup.string().matches(/^[A-Za-z0-9]{12,50}$/, {message: 'must be alphanumeric, 12-50'}).required(),
        price: yup.number().min(0.01, 'must be greater than 0.01').required(),
        stock: yup.number().min(0,'must be greater than 0').optional().default(0),
        image_url: yup.string().min(2).max(100).optional().default(null),
        isDeleted: yup.boolean().optional().default(false),
    })
  })
  .required();

const deleteById = yup
  .object({
    params: yup.object({
        id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID is non-Objectid'}).required(),
    }),
  })
  .required();

export default {
  findAll,
  create,
  findById,
  deleteById,
  updateById
};