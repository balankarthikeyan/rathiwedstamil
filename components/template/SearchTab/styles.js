import React from 'react'
import styled from 'styled-components'
import { Button, Grid } from '@material-ui/core'

export const StyledTabMainWrapper = styled(Grid)`
  width: 100%;
  border-radius: 8px;
  border: 1px solid #e0e6f6;
  min-height: 310px;
`

export const StyledTabHeaderWrapper = styled(Grid)`
  width: 100%;
  background: #e8edfb;
  height: 36px;
  padding: 0 12px;
  border-radius: 8px 8px 0 0;
`
export const StyledTabContainerWrapper = styled(Grid)`
  padding: 12px;
  width: 100%;
  display: flex;

  .cls-IncludeExclude-kit {
    margin-bottom: 24px;
  }
  .cls-keywordposition {
    margin-bottom: 66px;
  }
  .base-radio-list {
    margin-top: 0px;

    fieldset {
      label {
        .MuiTypography-body1 {
          font-size: 13px;
        }
      }
    }
  }
`
export const StyledTabButton = styled(Button)`
  font-size: 13px;
  background: transparent;
  box-shadow: none;
  color: black;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  text-transform: capitalize;
  padding: 6px 0px;
  margin-right: 40px;
  &:hover {
    font-size: 13px;
    background: transparent;
    box-shadow: none;
  }

  &.selected {
    color: #486ce2;
    border-bottom-color: #486ce2;
  }
`

export const StyledColumWrapper = styled(Grid)`
  width: 100%;
  max-width: 420px;
  margin-right: 50px;
`
