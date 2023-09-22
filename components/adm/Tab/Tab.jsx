import React, { useState } from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import * as Adm from '@adm'

const TabMainWrapper = styled(Grid)`
  display: flex;
  align-items: center;
`
const TabButton = styled(Button)`
  &.selected {
    pointer-events: none;
  }
`

const defaultRenderTabMenu = props => {
  const {
    activeTabIdx,
    setActiveTabIdx,
    onTabMenuClick,
    fetchList,
    setFetchList,
  } = props || {}
  return (
    <>
      {fetchList &&
        fetchList.map((item, index) => {
          const { tabName } = item || {}
          return (
            <TabButton
              className={`${activeTabIdx === index ? 'selected' : ''}`}
              variant={`${activeTabIdx === index ? 'contained' : ''}`}
              data-key={index}
              key={`${JSON.stringify(item)}_${index}`}
              onClick={onTabMenuClick}
              style={{ height: '36px' }}
            >
              {tabName}
            </TabButton>
          )
        })}
    </>
  )
}
const defaultRenderContainer = props => {
  const {
    activeTabIdx,
    setActiveTabIdx,
    onTabMenuClick,
    fetchList,
    setFetchList,
  } = props || {}
  return <>container</>
}

function Tab(props) {
  const defaultList = [
    {
      tabName: 'fruits',
    },
    {
      tabName: 'veg',
    },
  ]
  const {
    list = defaultList,
    selectedDropdown = 0,
    activeMenuIdx = 0,
    onUpdate = () => '',
    sendUpdateDropdown = () => '',
    renderTabMenu = defaultRenderTabMenu,
    renderContainer = defaultRenderContainer,
  } = props || {}
  const [activeTabIdx, setActiveTabIdx] = React.useState(activeMenuIdx)
  const [fetchList, setFetchList] = React.useState(list)

  React.useEffect(() => {
    const objListKit = fetchList[activeTabIdx]
    onUpdate({ ...objListKit, activeTabIdx })
  }, [])

  const onTabMenuClick = e => {
    e.preventDefault()
    const curMenuIdx = +e.currentTarget.getAttribute('data-key')
    setActiveTabIdx(curMenuIdx === activeTabIdx ? -1 : curMenuIdx)
    const objListKit = fetchList[curMenuIdx]
    onUpdate({ ...objListKit, activeTabIdx })
  }

  const stateProps = {
    activeTabIdx,
    setActiveTabIdx,
    onTabMenuClick,
    fetchList,
    setFetchList,
  }
  return (
    <TabMainWrapper className="base-tab-dropdown" container direction="row">
      {renderTabMenu(stateProps)}
      {renderContainer(stateProps)}
    </TabMainWrapper>
  )
}

export { Tab }
export default Tab
