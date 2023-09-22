import * as React from 'react'
import { createStoryModule } from './base.stories'
import { FormKit } from '@formKit'
import * as Yup from 'yup'
const formkitStories = createStoryModule('forms')

formkitStories.add('dynamic form ui', () => {
  const customOnSubmit = props => {
    console.log(props)
  }
  const customOnChange = props => {
    console.log(props)
  }

  const attr = {
    onChangeForm: customOnChange,
    onSubmit: customOnSubmit,
    isEditMode: true,
    isOpenMode: true,
    editMode: true,
  }
  //
  return <FormKit {...attr} />
})

formkitStories.add('dynamic form detail view  ui', () => {
  const customOnSubmit = props => {
    console.log('customOnSubmit', props)
  }
  const customOnChange = props => {
    console.log(props)
  }

  const attr = {
    onChangeForm: customOnChange,
    onSubmit: customOnSubmit,
    isDetailView: true,
  }
  return <FormKit {...attr} />
})
formkitStories.add('test form', () => {
  const customOnSubmit = props => {
    console.log(props)
  }
  const customOnChange = props => {
    console.log('customOnChange', props)
  }

  const defaultFormList = [
    {
      label: 'Email',
      defaultValue: '',
      inputType: 'email',
      identifer: 'email',
      validationSchema: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
    },
    {
      label: 'Password',
      defaultValue: '',
      inputType: 'password',
      identifer: 'password',
      validationSchema: Yup.string()
        .max(255)
        .required('Password is required'),
    },
    {
      label: 'Remember Me',
      defaultChecked: false,
      inputType: 'checkBox',
      identifer: 'rememeberMe',
    },
    {
      label: 'Reset Password',
      defaultValue: 'https://google.com',
      inputType: 'link',
      identifer: 'resetPassword',
    },
  ]

  const attr = {
    formList: defaultFormList,
    onChangeForm: customOnChange,
    onSubmit: customOnSubmit,
  }
  return <FormKit {...attr} />
})
