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
export const IconTextButton = styled(Button)`
  text-transform: capitalize;
  color: #fff;
  box-shadow: none;
  width: 48px;
  height: 48px;
  min-width: 48px;
  background: transparent;
  margin-left: 10px;
  border: 1px solid #d2dbe8;
  &:hover {
    background: transparent;
    box-shadow: none;
  }
  label {
    color: #486ce1;
    position: absolute;
    right: 0;
    left: 0;
    margin: auto;
    bottom: -27px;
  }

  .MuiButton-startIcon {
    display: flex;
    margin: auto;
  }
`
export const MainWrapper = styled(Grid)`
  margin: 0;
  padding: 24px;

  .base-radio-list {
    margin-top: 20px;
    .MuiFormGroup-root {
      flex-direction: row;
    }
    .MuiFormControlLabel-label {
      font-weight: 500;
    }
  }
`
