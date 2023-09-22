import React, { useState } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import * as Adm from '@adm'
import { MenuMainWrapper, MenuButton } from './styles'

const defaultList = [
  {
    menuName: 'Key Metrics',
  },
  {
    menuName: 'Results',
  },
]

function PanelMenu(props) {
  const {
    list = defaultList,
    selectedDropdown = 0,
    defaultActiveMenuIdx = 0,
    onUpdate = () => '',
    sendUpdateDropdown = () => '',
  } = props || {}
  const [activeMenuIdx, setActiveMenuIdx] = React.useState(defaultActiveMenuIdx)
  const [fetchList, setFetchList] = React.useState(list)

  React.useEffect(() => {
    const objListKit = fetchList[activeMenuIdx]
    onUpdate({ ...objListKit, activeMenuIdx })
  }, [])

  const onMenuMenuClick = e => {
    e.preventDefault()
    const curMenuIdx = +e.currentTarget.getAttribute('data-key')
    setActiveMenuIdx(curMenuIdx === activeMenuIdx ? -1 : curMenuIdx)
    const objListKit = fetchList[curMenuIdx]
    onUpdate({ ...objListKit, activeMenuIdx: curMenuIdx })
  }

  const renderMenuMenu = () => {
    return (
      <Grid>
        {fetchList &&
          fetchList.map((item, index) => {
            const { menuName } = item || {}
            return (
              <MenuButton
                href=""
                className={`${activeMenuIdx === index ? 'selected' : ''}`}
                variant={`${activeMenuIdx === index ? 'contained' : ''}`}
                data-key={index}
                key={`${JSON.stringify(item)}_${index}`}
                onClick={onMenuMenuClick}
                style={{ height: '36px' }}
              >
                {menuName}
              </MenuButton>
            )
          })}
      </Grid>
    )
  }

  return (
    <MenuMainWrapper className="base-Menu-dropdown" container direction="row">
      {renderMenuMenu()}
    </MenuMainWrapper>
  )
}

export { PanelMenu }
export default PanelMenu
