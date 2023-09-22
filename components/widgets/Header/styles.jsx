import styled from 'styled-components'
import { Menu, MenuItem } from '@material-ui/core'
export const HeaderWrapper = styled.header`
  background-color: #fff;
  display: flex;
  padding: 24px 16px;
  height: 88px;
  align-items: center;
  justify-content: space-between;
`
export const HeaderRightPanel = styled.div`
  display: flex;
  .base-dropdown-menu {
    display: flex;
    align-items: center;
  }
`
export const IconsListWrapper = styled.div`
  display: flex;
  margin-right: 20px;
`
export const IconsItem = styled.div`
  display: flex;
  padding: 16px;
  opacity: 30%;
  transition: all 250ms ease;
  &.active,
  &:hover {
    opacity: 100%;
    transform: scale(1.2);
  }
  &:active {
    opacity: 100%;
    transform: scale(0.8);
  }
`

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`
export const UserInfoName = styled.p`
  margin-right: 10px;
`
export const UserInfoImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`
export const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    border: 1px solid #dedede;
    transform: translateY(10px) !important;
    box-shadow: 0;
    width: 200px;
  }
`
export const StyledMenuItem = styled(MenuItem)`
  svg {
    margin-right: 10px;
  }
`
