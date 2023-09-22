import * as Yup from 'yup'

export const facetUIYupSchema = props =>
  Yup.object().shape({
    ...props,
  })
