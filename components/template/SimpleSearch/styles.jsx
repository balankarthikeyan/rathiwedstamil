import styled from 'styled-components'
import {
  Container,
  Typography,
  Button,
  Grid,
  IconButton,
  Chip,
  CardHeader,
} from '@material-ui/core'

export const SimpleSearchTextContentWrapper = styled(Grid)`
  width: 100%;
  display: flex;
  font-size: 14px;
  position: relative;
  font-weight: normal;
  margin-top: 20px;
`
export const SimpleSearchTextAreaWrapper = styled(Grid)`
  width: calc(100% - 148px);
  border: 1px solid #fff;
  border-bottom: 1px solid #d2dbe8;
  height: 45px;
  min-height: 45px;

  position: relative;
  transition: all 400ms ease;
  display: flex;
  background: #fff;
  padding-right: 40px;
  border-radius: 10px 10px 0 0;

  .cls-search-box-innerwrapper {
    width: 100%;
  }
  .cls-search-box-kit {
    width: 100%;
    overflow: auto;
    height: 100%;
    max-height: 200px;
    display: flex;
  }
  &.cls-seach-max-active {
    border-radius: 10px;
    border: 1px solid #d2dbe8;
    min-height: 120px;
    height: 100%;
    flex-wrap: wrap;
    padding-bottom: 10px;
    .cls-search-box-kit {
      display: block;
    }
    .cls-search-box-innerwrapper {
      width: 100%;
    }

    textarea,
    input {
      display: flex;
      width: 100% !important;
      height: 80%;
      max-height: 150px;
      max-width: 100%;
      min-height: 40px;
    }
  }
`
export const SimpleSearchSubmit = styled(Button)`
  width: 132px;
  height: 40px;
  position: absolute;
  right: 0;
  bottom: 0;
  box-shadow: none;
  background-color: #486ce2;
`
export const SimpleSearchIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
  top: 0;
`
export const SimpleSearchChipButton = styled(Chip)`
  margin: 5px;
  color: #d62884;
  background-color: #ffffff;
  border: 1px solid #d0d9e4;
  border-radius: 4px;
  font-weight: normal;

  &:active,
  &:focus {
    color: #d62884;
    background-color: #ffffff;
  }
  .MuiChip-deleteIconColorPrimary {
    color: rgb(0 0 0 / 70%);
  }
  .MuiChip-label {
    margin-right: 15px;
  }
`

const SimpleInputBoxCss = `
  width: 100%;
  min-width: 400px;
  height: 38px;
  padding: 10px;
  border: none;
  outline: 0;
  background: transparent;
  opacity: 100%;
  transition: opacity 400ms ease;
  font-family: 'Robato', arial;

  &.disabled {
    opacity: 0%;
    display: none !important;
  }`
export const SimpleSearchInputBox = styled.input`
  ${SimpleInputBoxCss}
`
export const SimpleSearchTextBox = styled.textarea`
  ${SimpleInputBoxCss}
`
export const SimpleSearchClear = styled.div`
  position: absolute;
  bottom: -25px;
  right: 0;
  color: #496ce1;
  text-transform: capitalize;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export const SimpleSearchTextWarning = styled(Grid)`
  position: absolute;
  left: 0;
  bottom: -25px;
  font-size: 12px;
  color: #676767;
  transition: all 300ms ease;
  &.active {
    left: 6px;
    bottom: 5px;
  }
  display: flex;
`

export const SimpleSearchAlertWarning = styled(Chip)`
  background: #ffc007;
  color: #000;
  position: absolute;
  bottom: -28px;
  height: 20px;
  margin: auto;
  width: 180px;
  left: 0;
  right: 0;
  opacity: 0%;
  transition: opacity 300ms ease;
  &.active {
    opacity: 100%;
  }

  svg {
    width: 15px;
  }
`
