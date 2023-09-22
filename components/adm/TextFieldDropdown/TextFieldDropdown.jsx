import React, { useState } from "react"
import { TextField, Button, ButtonGroup, Typography } from "@material-ui/core"
import * as Yup from "yup"
import * as Adm from "@adm"
import * as Utils from "@utils"
import styled from "styled-components"

const TextFieldDropdownMainWrapper = styled.div`
  display: flex;
`
const TextFieldMainWrapper = styled.span`
  display: flex;
  flex-direction: column;
`
const Error = styled(Typography)`
  color: #f44336;
  font-size: 0.6964285714285714rem;
  margin-top: 3px !important;
`
const TabInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const TabButton = styled(Button)`
  &.selected {
    pointer-events: none;
  }
  height: 40px;
`

const TextFieldWrapper = styled(TextField)`
  width: 168px;
  height: 36px;
  margin-right: 10px !important;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
`
function TextFieldDropdown(props) {
  const defaultList = ["one", "two"]
  const {
    error = "",
    defaultValue = "0",
    list = defaultList,
    activeMenuIdx = 0,
    onUpdate = () => "",
    textBoxType = "number",
    internalValidation = true,
  } = props || {}

  const [isTextBoxType, setTextBoxType] = React.useState(textBoxType)
  const [activeTabIdx, setActiveTabIdx] = React.useState(activeMenuIdx)
  const [getTextValue, setTextValue] = useState(defaultValue)
  const [isType, setType] = useState(false)
  React.useEffect(() => {
    const objListKit = list[activeTabIdx]
    onUpdate({
      value: getTextValue,
      type: objListKit,
    })
  }, [activeTabIdx, getTextValue])

  const renderTextField = () => {
    return (
      <TextFieldMainWrapper>
        <TextFieldWrapper
          type={isTextBoxType}
          name="value"
          margin="dense"
          variant="outlined"
          defaultValue={getTextValue}
          placeholder="amount"
          onChange={(e) => {
            setTextValue(e.target.value)
            setType(true)
          }}
        />
        {internalValidation &&
          isType &&
          Utils.JSUtils.isEmpty(getTextValue) && (
            <Error>{`"* is valid"`}</Error>
          )}
        {Utils.JSUtils.isEmpty(error) === false && <Error>{error}</Error>}
      </TextFieldMainWrapper>
    )
  }

  return (
    <TextFieldDropdownMainWrapper
      className={`cls-base-text-dropdown${
        Utils.JSUtils.isEmpty(error) === false ? "cls-error-kit" : ""
      }`}
    >
      {renderTextField()}
      <Adm.DropdownKit
        list={list}
        defaultValue={list[activeMenuIdx]}
        onUpdate={({ index }) => {
          setActiveTabIdx(Number(index))
        }}
      />
    </TextFieldDropdownMainWrapper>
  )
}
export { TextFieldDropdown }
export default TextFieldDropdown
