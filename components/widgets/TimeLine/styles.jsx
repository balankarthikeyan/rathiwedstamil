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
export const SearchChip = styled(Chip)`
  margin-right: 4px;
  margin-bottom: 4px;
  height: 24px;
  border: 1px solid #dae1f9;
  background: none;
  color: #486ce2;
  font-size: 12px;

  &.closed {
    max-width: 120px;
  }

  &.active {
    background: #dae1f9;
    color: #486ce2;
  }
  &:hover {
    background: #f2f5ff;
    color: #486ce2;
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
  border: 1px solid #dae1f9;
  background: none;
  color: #486ce2;
  font-weight: bold;
  width: auto;
  &.cls-more-count,
  &.cls-more-count:hover,
  &.cls-more-count:active {
    background: #dae1f9;
    color: #486ce2;
  }
  &.cls-more-icon {
    width: 40px;
    .MuiChip-label,
    .MuiTouchRipple-root {
      display: none;
    }
  }

  &:hover {
    border: 1px solid #dae1f9;
    background: none;
    color: #486ce2;
  }
`
