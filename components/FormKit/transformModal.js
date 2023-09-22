import { facetUIYupSchema } from "./yupSchema"

const makeModelSetSchema = (tempList) => {
  let modelObj = {}
  if (tempList.length > 0) {
    for (let i = 0; i < tempList.length; i++) {
      const item = tempList[i]
      if (item.inputType === "fieldset") {
        const { children: subtempList = [] } = item || {}
        if (subtempList) {
          modelObj = { ...modelObj, ...makeModelSetSchema(subtempList) }
        }
        // } else if (item.inputType === "dropdown") {
        //   const identifer = item.identifer
        //   const validationSchema = item.validationSchema
        //   modelObj[identifer] = validationSchema
      } else {
        const identifer = item.identifer
        const validationSchema = item.validationSchema
        modelObj[identifer] = validationSchema
      }
    }
  }

  // console.log("schema", modelObj)
  return modelObj
}

export const transformValidationSchema = (list) => {
  let obj = makeModelSetSchema(list) || {}
  return obj ? { validationSchema: facetUIYupSchema(obj) } : {}
}

const makeModelSetIntialValues = (tempList) => {
  let modelObj = {}
  if (tempList.length > 0) {
    for (let i = 0; i < tempList.length; i++) {
      const item = tempList[i]
      const identifer = item.identifer
      let value = item.defaultValue === "" ? "" : item.defaultValue
      if (item.inputType === "fieldset") {
        const { children: subtempList = [] } = item || {}
        if (subtempList) {
          modelObj = { ...modelObj, ...makeModelSetIntialValues(subtempList) }
        }
      } else {
        if (item.inputType === "dropdown") {
          value = item.defaultValue
        } else {
          if (item.inputType === "checkBox") {
            const { defaultChecked = false } = item
            value = defaultChecked
          }
        }
        modelObj[identifer] = value
      }
    }
  }
  return modelObj
}

export const transformIntialValues = (formList, cardData, formType) => {
  let list = []
  if (formType === "edit") {
    list = transformGivenValues(formList, cardData)
  } else {
    list = [...formList]
  }
  let obj = makeModelSetIntialValues(list) || {}

  return obj
    ? {
        initialValues: obj,
      }
    : {}
}

export const transformGivenValues = (formList, cardData) => {
  const list = [...formList]

  for (var k = 0; k < list.length; k++) {
    for (var j = 0; j < Object.keys(cardData).length; j++) {
      // eslint-disable-next-line eqeqeq
      if (list[k].identifer == Object.keys(cardData)[j]) {
        list[k].value = cardData[Object.keys(cardData)[j]]
        break
      }
    }
  }
  return list
}
