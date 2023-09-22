import * as Yup from 'yup'
export const defaultFormList = [
  {
    label: 'Registered Email',
    defaultValue: 'justine.robinson@gmail.com',
    inputType: 'email',
    identifer: 'email',
    validationSchema: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
  },
  {
    label: 'Password',
    defaultValue: 'justine@123',
    inputType: 'password',
    identifer: 'password',
    validationSchema: Yup.string()
      .max(255)
      .required('Password is required'),
  },
  {
    label: 'fieldset title',
    inputType: 'fieldset',
    identifer: 'fieldsetid',
    children: [
      {
        label: 'Remember Me',
        defaultChecked: false,
        inputType: 'checkBox',
        identifer: 'rememeberMe',
      },
      {
        label: 'Reset Password',
        defaultValue: '/about',
        inputType: 'link',
        identifer: 'resetPassword',
      },
    ],
  },
]
