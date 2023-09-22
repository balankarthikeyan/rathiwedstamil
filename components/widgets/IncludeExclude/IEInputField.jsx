import React from 'react'
import { StyledInputField } from './styles'

function IEInputField(props) {
  const {
    defaultValue = '',
    placeholder = 'Type to include keyword',
    onUpdate = () => '',
  } = props || {}

  const [InputValueString, setInputValueString] = React.useState(defaultValue)
  React.useEffect(() => {
    setInputValueString(defaultValue)
  }, [defaultValue])

  const handleKeyPressEnter = e => {
    if (e.keyCode == 13) {
      let InputValue = e.currentTarget.value
      let valuesSplit = []
      InputValue = InputValue.trim()
      if (InputValueString.includes(',') || InputValueString.length > 0) {
        let arr = InputValueString.split(',')
        arr = [...arr, InputValue]
        InputValue = arr.join(',')
      }
      if (InputValue.includes(',')) {
        valuesSplit = InputValue.split(',')
        valuesSplit = valuesSplit.filter(item => {
          item = item.trim()
          return item !== ''
        })
      } else {
        valuesSplit[0] = InputValue
      }
      onUpdate({ value: valuesSplit })
      e.currentTarget.value = ''
    }
  }

  return (
    <StyledInputField
      onKeyDown={handleKeyPressEnter}
      key={InputValueString}
      defaultValue=""
      placeholder={placeholder}
      maxLength={1000}
      // defaultValue={InputValueString}
      // onChange={handleOnChange}
    />
  )
}

export { IEInputField }
