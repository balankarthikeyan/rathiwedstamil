import Switch from "@material-ui/core/Switch"
import React from "react"
import { FormControlLabel } from "@material-ui/core"
import { makeStyles, withStyles } from "@material-ui/core/styles"

const StyledSwitch = withStyles({
  switchBase: {
    color: "rgba(158, 158, 158, 1)",
  },
  track: {
    backgroundColor: "rgba(158, 158, 158, 1)",
    width: "34px",
    height: "14px",
  },
  thumb: {
    width: "20px",
    height: "20px",
  },
})(Switch)

function ToggleButton(props) {
  const { handleChange, checked, value, name, labelPlacement, className = "" } =
    props || {}
  return (
    <FormControlLabel
      className={className}
      control={
        <StyledSwitch
          className={className}
          onChange={handleChange}
          checked={checked}
          defaultValue={value}
          name={name}
        />
      }
      label={name}
      labelPlacement={labelPlacement}
    />
  )
}

export { ToggleButton }
export default ToggleButton
