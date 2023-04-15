import * as yup from 'yup'

const createPassword = yup
  .object({
    newPassword: yup
      .string()
      .min(8, 'at least 8 characters')
      .oneOf([yup.ref('confirmNewPassword')], 'passwords are not the same'),
    confirmNewPassword: yup
      .string()
      .min(8, 'at least 8 characters')
      .oneOf([yup.ref('newPassword')], 'passwords are not the same'),
  })
  .required()

const changePassword = createPassword
  .shape({
    currentPassword: yup.string().min(8, 'at least 8 characters'),
  })
  .required()

const create = createPassword
  .shape({
    fullname: yup.string().required('full name is required'),
    email: yup.string().email('invalid email').required('email is required'),
    phone: yup.string().nullable(),
    tokenVerify: yup.string().nullable(),
    UploadId: yup.string().nullable(),
    isActive: yup.boolean().required('is active is required'),
    RoleId: yup.string().required('role is required'),
  })
  .required()

const update = yup
  .object({
    fullname: yup.string().required('full name is required'),
    email: yup.string().email('invalid email').required('email is required'),
    phone: yup.string().nullable(),
    UploadId: yup.string().nullable(),
    fileUpload: yup.string().nullable(),
  })
  .required()

const userSchema = { createPassword, create, update, changePassword }

export default userSchema
