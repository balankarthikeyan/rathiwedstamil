import * as React from 'react'

import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from '@material-ui/core'
import { InboxIcon, DraftsIcon, SendIcon } from '@iconsGallery'
import * as Utils from '@utils'
import { StyledMenu as DropdownStyledMenu } from './styles'

const defaultRenderMenuList = props => {
  const {
    list,
    iconList,
    anchorEl,
    setAnchorEl,
    isDropdownMenu,
    setDropdownMenu,
    onHandleMenuClose,
    onHandleClickMenuItem,
  } = props || {}

  return (
    !Utils.JSUtils.isEmpty(list) && (
      <DropdownStyledMenu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        keepMounted
        open={isDropdownMenu}
        onClose={onHandleMenuClose}
      >
        {!Utils.JSUtils.isEmpty(list) &&
          list.map((data, index) => {
            let DynamicIcon = () => <React.Fragment />
            if (!Utils.JSUtils.isEmpty(iconList)) {
              if (undefined !== iconList[index]) {
                let LocalSetIcon = iconList[index]
                DynamicIcon = () => (
                  <ListItemIcon>
                    <LocalSetIcon />
                  </ListItemIcon>
                )
              }
            }
            return (
              <MenuItem
                data-key={index}
                key={index}
                onClick={onHandleClickMenuItem}
              >
                <DynamicIcon />
                <ListItemText primary={data} />
              </MenuItem>
            )
          })}
      </DropdownStyledMenu>
    )
  )
}
const defaultRenderButton = props => {
  const {
    list,
    iconList,
    anchorEl,
    setAnchorEl,
    isDropdownMenu,
    setDropdownMenu,
    onHandleMenuClose,
    onHandleClickMenuItem,
    onHandleClickButton,
    buttonText,
    buttonIcon,
  } = props || {}

  return (
    <Button
      aria-controls="customized-menu"
      aria-haspopup="true"
      variant="contained"
      color="primary"
      onClick={onHandleClickButton}
    >
      {buttonText}
      {buttonIcon()}
    </Button>
  )
}

function DropdownMenu(props) {
  const {
    className = '',
    buttonText = 'Menu',
    buttonIcon = () => <React.Fragment />,
    list = ['Menu ONE', 'Menu TWO', 'Menu THREE'],
    iconList = [InboxIcon, InboxIcon, InboxIcon],
    onUpdate = propsInner => {
      // console.log("props", propsInner)
    },
    renderButton = defaultRenderButton,
    renderMenuList = defaultRenderMenuList,
  } = props || {}
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isDropdownMenu, setDropdownMenu] = React.useState(false)

  const onHandleClickButton = event => {
    setAnchorEl(event.currentTarget)
    setDropdownMenu(true)
  }

  const onHandleMenuClose = () => {
    setDropdownMenu(false)
  }

  const onHandleClickMenuItem = event => {
    const index = event.currentTarget.getAttribute('data-key')
    const value = list[index]
    onUpdate({ value, index })
    setDropdownMenu(false)
  }

  const stateProps = {
    list,
    iconList,
    anchorEl,
    setAnchorEl,
    isDropdownMenu,
    setDropdownMenu,
    onHandleMenuClose,
    onHandleClickMenuItem,
    onHandleClickButton,
    buttonText,
    buttonIcon,
  }

  return (
    <Grid className={`${className} base-dropdown-menu`}>
      {renderButton(stateProps)}
      {renderMenuList(stateProps)}
    </Grid>
  )
}

export { DropdownMenu, DropdownStyledMenu }
export default DropdownMenu
