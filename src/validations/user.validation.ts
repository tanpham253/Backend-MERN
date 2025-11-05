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
          .default(10),
        sort: yup.string().oneOf(['asc', 'desc']).optional().default('desc'),
        keyword: yup
          .string()
          .transform((value) => {
            const normalized = normalizeOptionalString(value);
            return normalized === undefined ? null : normalized;
          })
          .nullable()
          .optional()
          .default(null),
        active: yup
          .string()
          .transform((value) => {
            const normalized = normalizeOptionalString(value);
            return normalized;
          })
          .oneOf(['true', 'false'])
          .optional(),
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
      password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'atleast  1 and only of each lowercase letter, uppercase letter, digit, special character and 6 characters').max(255, "max 2555 character").required(),
      roles: yup.array().of(yup.string().oneOf(['staff','admin','admin'])).default(['staff']),
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
        first_name: yup.string().min(2, {message: 'firstName atleast 2 characters'}).max(50).optional(),
        last_name: yup.string().min(2).max(50).optional(),
        email: yup.string().matches(emailRegex, 'Email không hợp lệ').max(160).optional(),
        active: yup.boolean().optional(),
        password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {message: 'Invalid password'}).max(255, "Password Tối đã 2555 ký tự").optional(),
        roles: yup.array().of(yup.string().oneOf(['staff', 'admin', 'admin'])).optional(),
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