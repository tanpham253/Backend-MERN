import * as yup from 'yup';
// because yup don't have default export

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const parseOptionalNumber = (originalValue: unknown) => {
  if (originalValue === undefined || originalValue === null || originalValue === '') {
    return undefined;
  }

  const parsed = Number(originalValue);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const findAll = yup
  .object({
    query: yup
      .object({
        page: yup
          .number()
          .transform((_value, originalValue) => {
            const parsed = parseOptionalNumber(originalValue);
            return parsed === undefined ? undefined : parsed;
          })
          .min(1)
          .optional()
          .default(1),
        limit: yup
          .number()
          .transform((_value, originalValue) => {
            const parsed = parseOptionalNumber(originalValue);
            return parsed === undefined ? undefined : parsed;
          })
          .min(1)
          .max(100)
          .optional()
          .default(5),
        keyword: yup
          .string()
          .transform((value) => (value === undefined || value === null || value === '' ? null : value.trim()))
          .nullable()
          .optional()
          .default(null),
        sort_type: yup.string().oneOf(['asc', 'desc']).optional().default('desc'),
        sort_by: yup.string().trim().optional().default('createdAt'),
        cat_id: yup
          .string()
          .transform((value) => (value === '' ? undefined : value))
          .matches(objectIdRegex, { message: 'Category ID must be a valid ObjectId' })
          .optional(),
        brand_id: yup
          .string()
          .transform((value) => (value === '' ? undefined : value))
          .matches(objectIdRegex, { message: 'Brand ID must be a valid ObjectId' })
          .optional(),
      })
      .noUnknown(false),
  })
  .required();

const create = yup
  .object({
    body: yup.object({
      product_name: yup.string().min(2).max(50).required(),
      category_id: yup.string().matches(objectIdRegex, {message: 'ID is non-Objectid'}).required(),
      brand_id: yup.string().matches(objectIdRegex, {message: 'ID is non-Objectid'}).required(),
      description: yup.string().min(2).max(50).required(),
      slug: yup.string().matches(/^[A-Za-z0-9-_]{2,50}$/, {message: 'Only letters, numbers, dashes, and underscores, 2-50'}).required(),
      sku: yup.string().matches(/^[A-Za-z0-9]{12,50}$/, {message: 'must be alphanumeric, 12-50'}).required(),
      price: yup.number().min(0.01, 'must be greater than 0.01').required(),
      stock: yup.number().min(0,'must be greater than 0').optional().default(0),
      image_url: yup.string().min(2).max(100).optional().default(null),
      isDeleted: yup.boolean().optional().default(false),
      createdAt: yup.date().default(() => new Date()).optional(),
      updatedAt: yup.date().default(() => new Date()).optional(),
    }),
  })
  .required();

const findById = yup
  .object({
    params: yup.object({
        id: yup.string().matches(objectIdRegex, {message: 'ID is non-Objectid'}).required(),
    }),
  })
  .required();

const updateById = yup
  .object({
    params: yup.object({
        id: yup.string().matches(objectIdRegex, {message: 'ID is non-Objectid'}).required(),
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
        id: yup.string().matches(objectIdRegex, {message: 'ID is non-Objectid'}).required(),
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