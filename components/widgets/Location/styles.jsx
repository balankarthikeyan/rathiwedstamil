import styled from 'styled-components'
import {
  Container,
  Typography,
  Button,
  Grid,
  IconButton,
  Chip,
  CardHeader,
  Checkbox,
} from '@material-ui/core'

const skinScrollBar = `
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #486ce2;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #7292fd;
  }`

export const StyledCardHeader = styled(Grid)`
  border: 0px solid #eceff3;
  border-bottom: 1px solid #eceff3;
  border-radius: 5px;
  height: 72px;
  align-items: unset;
  padding: 8px;
`
export const StyledCardMenuHeader = styled(Grid)`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 8px;
  p {
    font-size: 13px;
    font-weight: bold;
    padding: 0;
    margin: 0;
  }
`
export const SearchIconButton = styled(IconButton)`
  padding: 0px;
`
export const SearchChipMainWrapper = styled(Grid)`
  display: flex;
  max-height: 110px;
  overflow: auto;
  flex-wrap: wrap;
  width: 100%;
  ${skinScrollBar}
`
export const SearchChip = styled(Chip)`
  margin-right: 4px;
  margin-bottom: 4px;
  height: 24px;
  border: 1px solid #ffdec6;
  background: none;
  color: #b18260;
  font-size: 12px;

  &.closed {
    max-width: 120px;
  }
  .MuiChip-deleteIcon {
    color: #b18260;
    width: 16px;
    height: 16px;
  }

  &.active {
    background: #ffdec6;
    color: #65584e;
  }
  &:hover {
    background: #ffdec6;
    color: #65584e;
  }
  @media (max-width: 1400px) {
    &.closed {
      max-width: 80px;
    }
  }
`
export const MoreChip = styled(Chip)`
  margin-right: 4px;
  margin-bottom: 4px;
  height: 24px;
  border: 1px solid #ffdec6;
  background: none;
  color: #b18260;
  font-weight: bold;
  width: auto;
  &.cls-more-count,
  &.cls-more-count:hover,
  &.cls-more-count:active {
    background: #ffdec6;
    color: #65584e;
  }
  &.cls-more-icon {
    width: 40px;
    .MuiChip-label,
    .MuiTouchRipple-root {
      display: none;
    }
    svg text {
      fill: #65584e;
    }
  }

  &:hover {
    border: 1px solid #ffdec6;
    background: none;
    color: #65584e;
  }
`

export const StyledSocialTitle = styled(Typography)`
  font-size: 13px;
  font-weight: bold;
  color: #7f7f7f;
  padding: 0;
  margin-top: 20px;
  margin-bottom: 10px;
`

export const StyledSearchListWrapper = styled(Grid)`
  height: 200px;
  overflow: auto;
  ${skinScrollBar}
`

export const StyledSearchInputMainWrapper = styled(Grid)`
  position: relative;

  svg {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    margin: auto;
  }
`
export const StyledSearchFormLabelWrapper = styled(Grid)`
  padding: 8px 0;
  border-bottom: 1px solid #eceff3;
`
export const StyledSearchFormLabelCheckbox = styled(Checkbox)`
  margin-right: 6px;
  padding: 0;
  color: #486ce2 !important;
  svg {
    width: 18px;
  }
`
export const StyledSearchInputBox = styled.input`
  width: 100%;
  height: 32px;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #eceff3;
  padding-left: 18px;
`

export const StyledSearchLocationFooterWrapper = styled(Grid)`
  padding-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`
export const StyledSearchLocationClear = styled(Typography)`
  cursor: pointer;
  color: #486ce2;
  font-size: 12px;
`
