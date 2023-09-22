import React, { useState } from 'react'

import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
} from '@material-ui/core'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import * as Adm from '@adm'
import { makeStyles } from '@material-ui/core/styles'
import { useEventCallback } from '@material-ui/core'

const RadioMainWrapper = styled(Grid)`
  display: flex;
  align-items: center;
`
const RadioWrapper = styled(Radio)`
  &.MuiRadio-root {
    color: rgb(0 0 0 / 21%);
  }
  &.MuiRadio-colorPrimary.Mui-checked {
    color: #486ce2 !important;
  }
`

function RadioButtonList(props) {
  const defaultList = [
    {
      name: 'fruits',
    },
    {
      name: 'veg',
    },
  ]
  const {
    list = defaultList,
    selectedDropdown = 0,
    activeMenuIdx = 0,
    onUpdate = () => '',
    sendUpdateDropdown = () => '',
    label = '',
  } = props || {}
  const [activeRadioIdx, setActiveRadioIdx] = React.useState(activeMenuIdx)
  const [fetchList, setFetchList] = React.useState(list)

  React.useEffect(() => {
    setActiveRadioIdx(activeMenuIdx)
  }, [activeMenuIdx])

  React.useEffect(() => {
    const objListKit = fetchList[activeRadioIdx]
    const { name } = objListKit || {}
    onUpdate({
      ...objListKit,
      activeRadioIdx,
    })
  }, [])

  const handleChange = e => {
    e.preventDefault()
    const curMenuIdx = Number(
      e.currentTarget
        .closest('label.MuiFormControlLabel-root')
        .getAttribute('data-key')
    )
    const objListKit = fetchList[curMenuIdx]
    onUpdate({ ...objListKit, activeRadioIdx: curMenuIdx })
    setActiveRadioIdx(curMenuIdx === activeRadioIdx ? -1 : curMenuIdx)
  }

  const renderRadioMenu = () => {
    const objListKit = fetchList[activeRadioIdx]
    const { name: nameValue } = objListKit || {}
    return (
      <>
        <FormControl component="fieldset">
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup
            aria-label={label}
            name={label}
            value={nameValue}
            onChange={handleChange}
          >
            {fetchList &&
              fetchList.map((item, index) => {
                const { name, disabled } = item || {}
                let formAttr = {
                  value: name,
                  label: name,
                  control: <RadioWrapper color="primary" />,
                  'data-key': index,
                }

                if (disabled === true) {
                  formAttr = {
                    ...formAttr,
                    disabled,
                    value: 'disabled',
                  }
                }

                return <FormControlLabel key={index} {...formAttr} />
              })}
          </RadioGroup>
        </FormControl>
      </>
    )
  }

  return (
    <RadioMainWrapper className="base-radio-list" container direction="row">
      {renderRadioMenu()}
    </RadioMainWrapper>
  )
}

export { RadioButtonList }
export default RadioButtonList
