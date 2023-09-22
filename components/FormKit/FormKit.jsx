import * as React from 'react'
import { Formik } from 'formik'
import {
  Card,
  Divider,
  List,
  ListItem,
  IconButton,
  CardHeader,
  Typography,
  Collapse,
  TextField,
  Button,
  ListItemText,
} from '@material-ui/core'

import _ from 'lodash'
import { facetUIYupSchema } from './yupSchema'
import { renderFormList } from './renderProp'
import {
  transformIntialValues,
  transformValidationSchema,
  transformGivenValues,
} from './transformModal'
import { defaultformInput } from './fixture'
import { useFacetUIContentStyles } from './styles'
import { addMethod } from 'yup'
import * as Adm from '@adm'
import * as ValidationKit from './ValidationKit'

const defaultRenderSubmitButton = ({ formUIProps }) => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
    submitForm,
    renderSubmitButton,
  } = formUIProps

  const savebuttonAttrs = {
    variant: 'contained',
    type: 'submit',
    color: 'primary',
  }

  return <Adm.Button {...savebuttonAttrs}>submit</Adm.Button>
}
const FormInnerUI = formUIProps => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    touched,
    values,
    submitForm,
    renderSubmitButton,
  } = formUIProps

  return (
    <form noValidate onSubmit={handleSubmit}>
      {errors.submit && ''}
      {renderFormList({ formUIProps })}
      {renderSubmitButton({ formUIProps })}
    </form>
  )
}

function FormKit(props) {
  const {
    setData,
    data,
    formList = defaultformInput,
    setCreateNewForm,
    onSubmit: onSubmitFormKit = () => {},
    formType,
    cardData,
    renderSubmitButton = defaultRenderSubmitButton,
    isDetailView = false,
    onChangeForm = () => {},
    onInitalLoadForm = () => {},
    ...remainingProps
  } = props || {}

  const intialValueObj = transformIntialValues(formList, cardData, formType)
  const [fetchFormList, setfetchFormList] = React.useState()
  const [resultFormList, setResultFormList] = React.useState({})
  const [formValues, setFormValues] = React.useState({})
  const [isPasswordActive, setPasswordActive] = React.useState(false)
  const [localFormList, setLocalFormList] = React.useState(
    intialValueObj.initialValues
  )

  React.useEffect(() => {
    setLocalFormList(intialValueObj.initialValues)
  }, [formList])

  React.useEffect(() => {
    onInitalLoadForm(localFormList)
  }, [])
  React.useEffect(() => {
    const form = { ...formValues, ...resultFormList }
    onChangeForm(form)
  }, [formValues, resultFormList])

  const validationSchemaObj = transformValidationSchema(formList)
  const formikAttribute = {
    onSubmit: propsKit => {
      onSubmitFormKit({ ...propsKit, ...resultFormList })
    },

    ...validationSchemaObj,
    ...intialValueObj,
  }

  const formSet = formProps => {
    const { values } = formProps
    const formSetAttr = {
      formList,
      setCreateNewForm,
      resultFormList,
      setResultFormList,
      localFormList,
      setLocalFormList,
      renderSubmitButton,
      isDetailView,
      isPasswordActive,
      setPasswordActive,
      ...formProps,
      ...remainingProps,
    }
    React.useEffect(() => {
      setFormValues(values)
    }, [values])
    return <FormInnerUI {...formSetAttr} />
  }
  return (
    <Formik enableReinitialize={true} {...formikAttribute}>
      {formSet}
    </Formik>
  )
}

export { FormKit, ValidationKit }
export default FormKit
