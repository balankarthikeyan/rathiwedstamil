import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import styled from 'styled-components'

export const LoginMainWrapper = styled(Grid)`
  font-family: 'Robato', Arial;
  width: 100%;
  max-width: 380px;
  margin: auto;
  .base-form-list-wrapper {
    &.cls-form-email,
    &.cls-form-password {
      display: flex;
      flex-direction: column;
      svg {
        color: #808080;
        #808080
      }

      label {
        font-size: 13px;
        font-weight: bold;
        color: #000000;
      }
    }
  }
  fieldset.base-form-fieldset-list-wrapper {
    display: flex;
    border: none;
    padding: 0;

    legend {
      display: none;
    }
    .MuiCheckbox-root {
      padding-left: 0;
    }
    .base-form-label-main-wrapper {
      width: auto;
    }
    .base-form-fieldset-list-innerwrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .MuiCheckbox-root {
        color: #486ce2;
      }
    }
    .cls-fieldset-rememeberMe label,
    .cls-form-resetpassword a {
      color: #486ce2;
      font-size: 13px;
      text-decoration: none;
      font-weight: unset;
      padding: 0;
    }
  }
`
export const LoginTitle = styled(Typography)`
  font-size: 32px;
  font-weight: bold;
  margin-top: 6.8vh;
  @media (max-width: 1400px) {
    margin-top: 3.4vh;
  }
`
export const LoginSubTitle = styled(Typography)`
  font-size: 18px;
  font-weight: 400;
  margin-top: 14px;
  margin-bottom: 30px;
`
export const LoginButton = styled(Button)`
  &.MuiButton-contained {
    box-shadow: none;
    width: 100%;
    background-color: #486ce2;
    height: 48px;
  }
`
export const SubFooterWrapper = styled(Grid)`
  display: flex;
  padding: 12px 0;
  border-top: 1px solid #e6e6e6;
  margin-top: 16.4vh;
  a {
    color: #486ce2;
    font-size: 13px;
    text-decoration: none;
    font-weight: unset;
    padding: 0;
  }

  span {
    line-height: 15px;
    padding: 0 12px;
    color: #dae1f9;
  }

  @media (max-width: 1400px) {
    margin-top: 10vh;
  }
`
export const CopyText = styled(Typography)`
  font-size: 13px;
  margin-left: auto;
`
