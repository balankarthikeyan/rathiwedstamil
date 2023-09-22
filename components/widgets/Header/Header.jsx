import * as React from 'react'
import * as StyledDOM from './styles'
import * as Adm from '@adm'
import * as IconGallery from '@iconsGallery'
import * as Utils from '@utils'
import { IconMenuList } from './IconMenuList'
import Router from 'next/router'
import { useCookies } from 'react-cookie'

const customRenderButton = ({ onHandleClickButton, buttonText, userInfo }) => {
  const { name = '', image = '' } = userInfo || {}
  return (
    <StyledDOM.UserInfoWrapper onClick={onHandleClickButton}>
      <StyledDOM.UserInfoName>{name}</StyledDOM.UserInfoName>
      <StyledDOM.UserInfoImage src={image} alt={name} />
    </StyledDOM.UserInfoWrapper>
  )
}

const customRenderMenuList = props => {
  const {
    list,
    iconList,
    anchorEl,
    setAnchorEl,
    isDropdownMenu,
    setDropdownMenu,
    onHandleMenuClose,
    onHandleClickMenuItem,
    cookies,
    setCookie,
  } = props || {}

  return (
    !Utils.JSUtils.isEmpty(list) && (
      <StyledDOM.StyledMenu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        keepMounted
        open={isDropdownMenu}
        onClose={onHandleMenuClose}
      >
        <StyledDOM.StyledMenuItem
          onClick={event => {
            onHandleClickMenuItem(event)
            setCookie('userId', '', {
              path: '/',
            })
            setCookie('isRememeberMe', 'false', { path: '/' })
            setCookie('logout', 'true', { path: '/' })

            const { host = '' } = location || {}
            if (host.includes('local')) {
              Router.push('/')
            } else {
              setCookie('ARRAffinitySameSite', '', { path: '/' })
              setCookie('AppServiceAuthSession', '', { path: '/' })
              setCookie('ARRAffinity', '', { path: '/' })
              setTimeout(() => {
                Router.push(
                  'https://login.windows.net/3fc100b7-66b2-4099-a591-10a07ba4acea/oauth2/logout?post_logout_redirect_uri=https://webapppmmt.azurewebsites.net/'
                )
              }, 1000)
            }
          }}
        >
          <IconGallery.ExitToAppIcon />
          {`Logout`}
        </StyledDOM.StyledMenuItem>
      </StyledDOM.StyledMenu>
    )
  )
}

function Header(props) {
  const { pathname = '' } = props || {}
  const [cookies, setCookie] = useCookies(['userId'])
  const { userId = 'Justine Robinson' } = cookies
  const userInfo = {
    name: userId,
    image: '/static/dp.png',
  }
  return (
    <StyledDOM.HeaderWrapper>
      <Adm.CustomLogo />
      <StyledDOM.HeaderRightPanel>
        <IconMenuList pathname={pathname} />
        <Adm.DropdownMenu
          renderButton={props => customRenderButton({ ...props, userInfo })}
          renderMenuList={props =>
            customRenderMenuList({ ...props, cookies, setCookie })
          }
        />
      </StyledDOM.HeaderRightPanel>
    </StyledDOM.HeaderWrapper>
  )
}

export { Header }
export default Header
