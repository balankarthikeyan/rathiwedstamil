import React from 'react'
import * as Adm from '@adm'
import styled from 'styled-components'
import { Button, Grid, Typography } from '@material-ui/core'

const StyledRangeMainWrapper = styled(Grid)`
  max-width: 420px !important;

  &.disabled {
    pointer-events: none;
    opacity: 0.6;
  }
`
const StyledRangeTitle = styled(Typography)`
  font-size: 13px !important;
`
const StyledRangeCount = styled(Typography)`
  font-size: 13px !important;
`
const StyledRangeHeaderWrapper = styled(Grid)`
  display: flex !important;
  justify-content: space-between !important;
  margin-bottom: 4px !important;
`
const StyledRangeWrapper = styled(Grid)`
  border: 1px solid #d2dbe8 !important;
  border-radius: 5px !important;
  padding: 4px !important;
  height: 36px !important;
  width: 420px !important;
  display: flex !important;
  align-items: center !important;
  box-sizing: border-box !important;

  .MuiSlider-root {
    margin-left: 10px !important;
    color: #486ce3 !important;
    padding: 10px 0 !important;
  }
  .MuiSlider-rail,
  .MuiSlider-track {
    height: 6px !important;
  }
  .MuiSlider-thumb {
    width: 16px !important;
    height: 16px !important;
    background-color: #fff !important;
    border: 2px solid #496ce2 !important;
  }
`
function SelectRange(props) {
  const {
    defaultSelectRangeValue = [0, 120],
    defaultRangeSelectedValue = [0, 100],
    onUpdate = () => '',
    className = '',
  } = props
  const [selectRangeValue, setSelectRangeValue] = React.useState(
    defaultSelectRangeValue
  )
  const [_x = 0, _y = 0] = selectRangeValue || []
  return (
    <StyledRangeMainWrapper className={`cls-select-range ${className}`}>
      <StyledRangeHeaderWrapper>
        <StyledRangeTitle>Select range</StyledRangeTitle>
        <StyledRangeCount>
          {_x} <span>to</span> {_y}
        </StyledRangeCount>
      </StyledRangeHeaderWrapper>
      <StyledRangeWrapper>
        <Adm.Range
          min={defaultSelectRangeValue[0]}
          max={defaultSelectRangeValue[1]}
          defaultValue={defaultRangeSelectedValue}
          getAriaLabel={index => (index === 0 ? 'Minimum' : 'Maximum')}
          rangeList={selectRangeValue}
          onUpdate={value => {
            setSelectRangeValue(value)
            onUpdate(value)
          }}
        />
      </StyledRangeWrapper>
    </StyledRangeMainWrapper>
  )
}

export { SelectRange }
export default SelectRange
