import React, { useState } from "react"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  TextField,
  Typography,
} from "@material-ui/core"
import * as Utils from "@utils"
import styled from "styled-components"
import * as IconsGallery from "@iconsGallery"
import { makeStyles } from "@material-ui/core/styles"
import { useStyles } from "@material-ui/pickers/views/Calendar/Day"


const FormControlWrapper = styled(FormControl)`
  .cls-empty-textfield input {
    background: rgb(224, 224, 224);
  }
  position: relative;
  &.cls-error {
    fieldset {
      border-color: rgb(244 67 53) !important;
    }
    .MuiSelect-selectMenu,
    .MuiSelect-icon {
      color: rgb(244 67 53);
    }
  }
`

const Error = styled(Typography)`
  color: #f44336;
  font-size: 0.6964285714285714rem;
  position: absolute;
  bottom: -24px;
  left: 12px;
`
function DropdownKit(props) {
  let {
    list = [],
    icons = [],
    defaultValue = "Option 01",
    onUpdate = () => "",
    className = "",
    name = "",
    placeholder = "Select",
    error = "",
    style = {},
  } = props || {}
  const [dropDownValue, setDropDownValue] = useState(defaultValue)
  const [dropDownlist, setDropDownlist] = useState(list)

  React.useEffect(() => {
    setDropDownValue(defaultValue)
  }, [defaultValue])

  React.useEffect(() => {
    setDropDownlist(list)
  }, [list])

  const onHandleChange = (event) => {
    const { target: { value = "" } = {} } = event || {}
    const index = event.currentTarget.getAttribute("data-key")
    setDropDownValue(value)
    onUpdate({ value, index })
  }

  const renderList = () =>
    !Utils.JSUtils.isEmpty(dropDownlist) &&
    dropDownlist.map((data, index) => {
      let IconSet = () => <React.Fragment />
      if (!Utils.JSUtils.isEmpty(icons)) {
        if (undefined !== icons[index]) {
          IconSet = icons[index]
        }
      }
      return (
        <MenuItem value={data} data-key={index} key={index}>
          {!Utils.JSUtils.isEmpty(icons) && <IconSet />}
          <span>{data}</span>
        </MenuItem>
      )
    })

  const StyledDropdown = makeStyles({
    select: {
      borderRadius: "0px 0 0 0px",
    },
  })

  const classes = useStyles()

  const selectAttr = {
    labelId: "demo-simple-select-outlined-label",
    id: "demo-simple-select-outlined",
    className: classes.select,
    name: name,
    value: dropDownValue,
    onChange: onHandleChange,
    displayEmpty: placeholder.length > 0,
  }

  return (
    <FormControlWrapper
      className={` ${className} cls-base-dropdown-kit ${
        error ? "cls-error" : ""
      }`}
      variant="outlined"
      size="small"
      style={style}
    >
      {Utils.JSUtils.isEmpty(dropDownlist) === false ? (
        <Select {...selectAttr}>
          {placeholder && (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          )}
          {renderList()}
        </Select>
      ) : (
        <TextField
          className={`cls-empty-textfield`}
          variant="outlined"
          size="small"
          type="text"
          name="state"
          disabled={true}
          value={placeholder}
        />
      )}
      {error && <Error>{error}</Error>}
    </FormControlWrapper>
  )
}
export { DropdownKit }
export default DropdownKit
