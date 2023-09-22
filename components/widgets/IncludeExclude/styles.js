import styled from 'styled-components'
import { Button, Grid, Typography } from '@material-ui/core'

export const StyledMainWrapper = styled(Grid)`
  width: 100%;
  max-width: 420px;
`
export const StyledTitle = styled(Typography)`
  font-size: 13px;
  font-weight: 700;
`
export const StyledTabHeaderWrapper = styled(Grid)`
  width: 100%;
  height: 20px;
  padding: 0;
  border-radius: 8px 8px 0 0;
  margin-bottom: 20px;
`

export const StyledTabButton = styled(Button)`
  font-size: 13px !important;
  background: transparent !important;
  box-shadow: none !important;
  color: #909090 !important;
  border: 0 !important;
  text-transform: capitalize !important;
  padding: 6px 0px !important;
  margin-right: 14px !important;

  .MuiButton-label {
    justify-content: left !important;
    width: fit-content !important;
  }
  &:hover {
    font-size: 13px !important;
    background: transparent !important;
    box-shadow: none !important;
  }

  &.selected {
    color: #000 !important;
    pointer-events: none !important;
  }
`

export const StyledInputField = styled.input`
  border: 1px solid #d2dbe8;
  height: 36px;
  width: 100%;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 6px 6px 6px 10px;
`
export const StyledTooltipWrapper = styled(Grid)`
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
