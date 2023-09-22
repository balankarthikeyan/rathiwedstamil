import React from "react"
import { TextField, Grid } from "@material-ui/core"
import { IconButton } from "@material-ui/core"
import { CloseIcon } from "@iconsGallery"
import styled from "styled-components"
import * as Utils from "@utils"

const AttributeMainWrapper = styled(Grid)`
  width: 50%;
  display: flex;
  position: relative;
`
const AttributeSubWrapper = styled(Grid)`
  width: 100%;
`
const AttributeCloseButton = styled(IconButton)`
  position: absolute;
  right: 0;
`

function FacetCell(props) {
  const {
    idx = 0,
    keyText = "",
    valueText = "",
    keyUpdate = () => "",
    valueUpdate = () => "",
    removeRecord = () => "",
    isDisableClose = false,
  } = props || {}
  const [textKey, setKeyText] = React.useState(keyText)
  const [textValue, setValueText] = React.useState(valueText)
  return (
    <AttributeMainWrapper>
      <AttributeSubWrapper>
        <TextField
          id={"label" + idx}
          placeholder={"Key"}
          variant="outlined"
          value={textKey}
          onChange={(e) => {
            setKeyText(e.target.value)
            keyUpdate(e.target.value, idx)
          }}
          size="small"
          style={{ paddingRight: "15px", width: "40%", marginBottom: "10px" }}
        />
        <TextField
          id={"value" + idx}
          placeholder={"Value"}
          variant="outlined"
          value={textValue}
          onChange={(e) => {
            setValueText(e.target.value)
            valueUpdate(e.target.value, idx)
          }}
          size="small"
          style={{ width: "40%", marginBottom: "10px", paddingRight: "15px" }}
        />
      </AttributeSubWrapper>
      {isDisableClose === false && (
        <AttributeCloseButton onClick={() => removeRecord(idx)}>
          <CloseIcon />
        </AttributeCloseButton>
      )}
    </AttributeMainWrapper>
  )
}

export { FacetCell }
