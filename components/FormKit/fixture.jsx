import * as Yup from 'yup'
import * as React from 'react'
import * as Adm from '@adm'

export const defaultformInput = [
  {
    label: 'Name',
    defaultValue: '',
    inputType: 'text',
    identifer: 'firstName',
    icon: 'Settings',
    validationSchema: Yup.string().required('in valid'),
  },
  {
    label: 'dropdown label',
    defaultValue: '',
    placeholder: 'Select dropdown',
    list: ['Mr.', 'Mrs.', 'Ms.'],
    inputType: 'dropdown',
    icon: 'Settings',
    identifer: 'dropdownid',
    validationSchema: Yup.string().required('in valid'),
  },
  {
    label: 'number',
    defaultValue: '',
    inputType: 'number',
    identifer: 'numberid',
    icon: 'Settings',
    validationSchema: Yup.string().required(`Zip Code 5 is required`),
  },

  {
    label: 'fruits label',
    defaultValue: '',
    list: ['apple', 'orange', 'tomato'],
    inputType: 'dropdown',
    identifer: 'fruitsid',
  },
  {
    label: 'Billing',
    defaultChecked: true,
    inputType: 'checkBox',
    identifer: 'billing',
  },
  {
    label: 'Shipping',
    defaultChecked: false,
    inputType: 'checkBox',
    identifer: 'shipping',
  },
  {
    label: 'fieldset title',
    inputType: 'fieldset',
    identifer: 'fieldsetid',
    children: [
      {
        label: 'Quantity',
        defaultValue: 9,
        inputType: 'quantity',
        identifer: 'quantity',
        infoMessage:
          'Quantity, which will need to be met before the promotion gets triggered or executed',
      },
      {
        label: 'marketing',
        defaultValue: true,
        inputType: 'toggle',
        renderTextTrue: 'Yes',
        renderTextFalse: 'No',
        identifer: 'marketing',
      },
      {
        label: 'Discount',
        defaultValue: { value: '11', type: '$' },
        inputType: 'tabtextfield',
        list: ['$', '%'],
        identifer: 'discount',
      },
      {
        label: 'discount dropdown',
        defaultValue: '11',
        activeValue: '$',
        inputType: 'textFieldDropdown',
        list: ['$', '%'],
        identifer: 'discountdropdown',
      },
      {
        label: 'calender set',
        defaultValue: { date: '2021-05-30', time: '08:00' },
        inputType: 'calender',
        identifer: 'calender',
      },
      {
        label: 'Tab Dropdown',
        defaultValue: {
          tabName: 'non veg',
          list: ['chicken', 'mutton', 'beef'],
          value: 'mutton',
        },
        list: [
          {
            tabName: 'fruits',
            list: ['Apple', 'Orange', 'Grapes'],
            value: 'Apple',
          },
          {
            tabName: 'veg',
            list: ['Cabbage', 'Tomato', 'Onion'],
            value: 'Cabbage',
          },
          {
            tabName: 'non veg',
            list: ['chicken', 'mutton', 'beef'],
            value: 'mutton',
          },
        ],
        inputType: 'tabDropdown',
        identifer: 'tabDropdownTest',
      },
      {
        label: 'supername',
        defaultValue: 'SK',
        inputType: 'text',
        identifer: 'supername',
        validationSchema: Yup.string().required('in valid'),
      },
      {
        label: 'supername1',
        defaultValue: 'SK',
        inputType: 'text',
        identifer: 'supername1',
        validationSchema: Yup.string().required('in valid'),
      },
    ],
  },
]
