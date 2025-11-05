import * as yup from 'yup';
// because yup don't have default export

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
        sort_type: yup.string().oneOf(['asc', 'desc']).optional().default('desc'),
        sort_by: yup.string().trim().optional().default('createdAt'),
        keyword: yup
          .string()
          .transform((value) => {
            const normalized = normalizeOptionalString(value);
            return normalized === undefined ? null : normalized;
          })
          .nullable()
          .optional()
          .default(null),
      })
      .noUnknown(false),
  })
  .required();

const create = yup
  .object({
    body: yup.object({
      first_name: yup.string().min(2).max(50).required(),
      last_name: yup.string().min(2).max(50).required(),
      email: yup.string().matches(emailRegex, 'Invalid Email').max(160).required(),

      active: yup.boolean().optional().default(true),
      phone_number: yup.boolean().optional().default(true),
      password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Atleast  1 and only of each lowercase letter, uppercase letter, digit, special character and 6 characters').max(255, "max 2555 character").required(),
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
        first_name: yup.string().min(2, "FirstName tối thiểu phải 2 kí tự").max(50).optional(),
        last_name: yup.string().min(2).max(50).optional(),
        email: yup.string().matches(emailRegex, 'Invalid email').max(160).optional(),
        active: yup.boolean().optional(),
        phone_number: yup.boolean().optional().default(true),
        password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Mật khẩu không hợp lệ').max(255, "Password Tối đã 2555 ký tự").optional(),
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