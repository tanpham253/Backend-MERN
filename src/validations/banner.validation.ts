import * as yup from 'yup';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const parseOptionalNumber = (originalValue: unknown) => {
  if (originalValue === undefined || originalValue === null || originalValue === '') {
    return undefined;
  }

  const parsed = Number(originalValue);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const normalizeOptionalString = (value: unknown) => {
  if (value === undefined || value === null) {
    return undefined;
  }

  const stringValue = String(value).trim();
  return stringValue === '' ? undefined : stringValue;
};

const parseOptionalDate = (value: unknown) => {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const date = new Date(value as string);
  return Number.isNaN(date.getTime()) ? null : date;
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
          .default(10),
        keyword: yup
          .string()
          .transform((value) => {
            const normalized = normalizeOptionalString(value);
            return normalized === undefined ? null : normalized;
          })
          .nullable()
          .optional()
          .default(null),
        is_active: yup
          .string()
          .transform((value) => {
            const normalized = normalizeOptionalString(value);
            return normalized;
          })
          .oneOf(['true', 'false'])
          .optional(),
        sort_by: yup.string().trim().optional().default('order'),
        sort_type: yup.string().oneOf(['asc', 'desc']).optional().default('asc'),
      })
      .noUnknown(false),
  })
  .required();

const create = yup
  .object({
    body: yup
      .object({
        title: yup.string().trim().min(2).max(120).required(),
        description: yup.string().trim().max(500).optional(),
        image_url: yup.string().trim().url('image_url must be a valid URL').required(),
        link: yup.string().trim().url('link must be a valid URL').optional(),
        order: yup
          .number()
          .transform((_value, originalValue) => {
            const parsed = parseOptionalNumber(originalValue);
            return parsed === undefined ? 0 : parsed;
          })
          .min(0)
          .optional()
          .default(0),
        is_active: yup.boolean().optional().default(true),
        start_date: yup
          .date()
          .transform((_value, originalValue) => parseOptionalDate(originalValue))
          .nullable()
          .optional()
          .default(null),
        end_date: yup
          .date()
          .transform((_value, originalValue) => parseOptionalDate(originalValue))
          .nullable()
          .optional()
          .default(null),
      })
      .noUnknown(false),
  })
  .required();

const findById = yup
  .object({
    params: yup.object({
      id: yup.string().matches(objectIdRegex, { message: 'ID must be a valid ObjectId' }).required(),
    }),
  })
  .required();

const updateById = yup
  .object({
    params: yup.object({
      id: yup.string().matches(objectIdRegex, { message: 'ID must be a valid ObjectId' }).required(),
    }),
    body: yup
      .object({
        title: yup.string().trim().min(2).max(120).optional(),
        description: yup.string().trim().max(500).optional(),
        image_url: yup.string().trim().url('image_url must be a valid URL').optional(),
        link: yup.string().trim().url('link must be a valid URL').optional(),
        order: yup
          .number()
          .transform((_value, originalValue) => {
            const parsed = parseOptionalNumber(originalValue);
            return parsed === undefined ? undefined : parsed;
          })
          .min(0)
          .optional(),
        is_active: yup.boolean().optional(),
        start_date: yup
          .date()
          .transform((_value, originalValue) => parseOptionalDate(originalValue))
          .nullable()
          .optional(),
        end_date: yup
          .date()
          .transform((_value, originalValue) => parseOptionalDate(originalValue))
          .nullable()
          .optional(),
      })
      .noUnknown(false),
  })
  .required();

const deleteById = yup
  .object({
    params: yup.object({
      id: yup.string().matches(objectIdRegex, { message: 'ID must be a valid ObjectId' }).required(),
    }),
  })
  .required();

export default {
  findAll,
  create,
  findById,
  updateById,
  deleteById,
};
