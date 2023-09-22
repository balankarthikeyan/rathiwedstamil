import styled from 'styled-components'
import { Container, Typography, Button, Grid } from '@material-ui/core'
export const BannerWrapper = styled.div`
  width: 100%;
  position: relative;
`
export const BannerImg = styled.img`
  width: 100%;
  min-height: 500px;
`
export const TimerParentWrapper = styled.div`
  position: absolute;
  bottom: 48px;
  left: 48px;
`
export const TimerWrapper = styled(Typography)`
  font-size: 64px;
  color: #fff;
  line-height: 65px;
`
export const UpdateTextWrapper = styled(Typography)`
  font-size: 13px;
  color: #fff;
`

export const SearchBgWrapper = styled(Grid)`
  position: absolute;
  top: 24px;
  right: 48px;
  background: #ffffffe0;
  width: 438px;
  border-radius: 10px;
  padding: 5px;
`
export const SearchTitleWrapper = styled(Typography)`
  font-size: 14px;
  text-transform: uppercase;
  padding: 5px;
  color: #808080;
  font-weight: 500;
`
export const SearchInnerWrapper = styled(Grid)`
  width: 100%;
  background: #ffffff;
  padding: 8px;
  border-radius: 6px;
  padding-top: 20px;
  a {
    text-decoration: none;
  }
`
export const SearchButtonWrapper = styled(Button)`
  svg {
    g,
    circle,
    line {
      stroke: #fff;
    }
  }
  text-transform: capitalize;
  color: #fff;
  width: 100%;
  box-shadow: none;
  height: 48px;
  background: #486ce2;
  &:hover {
    background: #3a5ccc;
    box-shadow: none;
  }
`
export const CustomizingButton = styled(Button)`
  position: absolute;
  bottom: 48px;
  right: 48px;
  color: #fff;

  svg {
    fill: #fff;
  }
  .MuiButton-label {
    display: flex;
    flex-direction: row-reverse;
  }
  .cls-text {
    padding: 0 10px;
    text-transform: capitalize;
  }
`
