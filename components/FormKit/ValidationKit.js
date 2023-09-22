import * as Yup from "yup"
import moment from "moment"
export const getNumberValidation = (props = {}) => {
  const {
    postiveText = "Is positive?",
    textError = "ERROR: The number must be greater than 0!",
    formatValidation = (value) => value > 1,
    number = 0,
  } = props || {}

  return {
    validationSchema: Yup.number()
      .required("* is required")
      // .positive("* postive value is required")
      .test(postiveText, textError, (value) => {
        return value > number
      }),
  }
}
export const getStringValidation = () => {
  return {
    validationSchema: Yup.string().required("* is required"),
  }
}
export const getBirthDateValidation = () => {
  return {
    validationSchema: Yup.string().test("DOB", "* is required", (value) => {
      return moment().diff(moment(value), "years") >= 25
    }),
  }
}

export const getEndDateValidation = (startDate) => {
  return {
    validationSchema: Yup.object().test(
      "End Date",
      "* End Date & time should be later than start date & time",
      (value) => {
        if (moment(startDate.date).diff(moment(value.date), "minute") < 0) {
          return true
        } else if (
          moment(startDate.date).diff(moment(value.date), "minute") === 0
        ) {
          return startDate.time > value.time ? false : true
        } else {
          return false
        }
      }
    ),
  }
}
