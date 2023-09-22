import * as React from 'react'
import * as StyledDOM from './styles'
import * as Adm from '@adm'
import * as IconGallery from '@iconsGallery'
import { Tooltip } from '@material-ui/core'

function IconMenuList(props) {
  const defaultMenuList = [
    {
      name: 'My Workspace',
      icon: <IconGallery.LayoutIcon />,
      pathName: '/myworkspace',
    },
    {
      name: 'Saved Search',
      icon: <IconGallery.AlbumIcon />,
      pathName: '',
    },
    {
      name: 'Search',
      icon: <IconGallery.SearchIcon />,
      pathName: '/search',
    },
    {
      name: 'Analysis',
      icon: <IconGallery.ChartIcon />,
      pathName: '',
    },
    {
      name: 'Notification',
      icon: <IconGallery.NotificationsIcon />,
      pathName: '',
    },
  ]
  const { menuList = defaultMenuList, pathname = '' } = props || {}

  return (
    <StyledDOM.IconsListWrapper>
      {menuList &&
        menuList.map((item, index) => {
          const ToolTipKit = () => {
            return (
              <Tooltip placement="bottom" title={item.name}>
                <StyledDOM.IconsItem
                  className={`${pathname === item.pathName ? 'active' : ''}`}
                >
                  {item.icon}
                </StyledDOM.IconsItem>
              </Tooltip>
            )
          }
          return (
            <React.Fragment key={index}>
              {item.pathName.length > 0 ? (
                <Adm.Link
                  href={item.pathName}
                  renderChildren={() => {
                    return <ToolTipKit />
                  }}
                />
              ) : (
                <ToolTipKit />
              )}
            </React.Fragment>
          )
        })}
    </StyledDOM.IconsListWrapper>
  )
}
export { IconMenuList }
export default IconMenuList
