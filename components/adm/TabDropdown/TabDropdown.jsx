import React, { useState } from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import * as Adm from '@adm'
import { makeStyles } from '@material-ui/core/styles'
import { useEventCallback } from '@material-ui/core'

const TabDropdownMainWrapper = styled(Grid)`
  display: flex;
  align-items: center;
`
const TabButton = styled(Button)`
  &.selected {
    pointer-events: none;
  }
`

const useStyles = makeStyles(theme => ({
  dropDown: {
    width: '202px',
    height: '36px',
    marginRight: '16px',
  },
}))

function TabDropdown(props) {
  const classes = useStyles()
  const defaultList = [
    {
      tabName: 'fruits',
      list: ['Apple', 'Orange', 'Grapes'],
      value: 'Apple',
    },
    {
      tabName: 'veg',
      list: ['Cabbage', 'Tomato', 'Onion'],
      value: 'Cabbage',
    },
  ]
  const {
    list = defaultList,
    selectedDropdown = 0,
    activeMenuIdx = 0,
    onUpdate = () => '',
    sendUpdateDropdown = () => '',
  } = props || {}
  const [activeTabIdx, setActiveTabIdx] = React.useState(activeMenuIdx)
  const [dropdownSelectIndex, setDropdownSelectIndex] = React.useState(0)
  const [fetchList, setFetchList] = React.useState(list)

  React.useEffect(() => {
    const objListKit = fetchList[activeTabIdx]
    // console.log(objListKit.list[dropdownSelectIndex])

    const res = {
      ...objListKit,
    }

    // console.log(fetchList)
    onUpdate(res)
  }, [activeTabIdx, dropdownSelectIndex])

  const onTabMenuClick = e => {
    e.preventDefault()
    const curMenuIdx = +e.currentTarget.getAttribute('data-key')
    setActiveTabIdx(curMenuIdx === activeTabIdx ? -1 : curMenuIdx)
    setDropdownSelectIndex(0)
  }

  const renderTabMenu = () => {
    return (
      <ButtonGroup disableElevation color="primary">
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
      </ButtonGroup>
    )
  }

  const onUpdateDropdown = ({ value }) => {
    fetchList[activeTabIdx].value = value
    const getIndex = list[activeTabIdx].list.indexOf(value)
    setDropdownSelectIndex(getIndex)
    sendUpdateDropdown(value)
    setFetchList(fetchList)
  }
  const renderDropdown = () => {
    return (
      <Grid>
        {fetchList &&
          fetchList.map((item, index) => {
            const { list: listKit = [], value: valueKit = '' } = item || {}
            return (
              activeTabIdx === index && (
                <Adm.DropdownKit
                  key={`${JSON.stringify(item)}_${index}`}
                  defaultValue={valueKit}
                  list={listKit}
                  onUpdate={onUpdateDropdown}
                  className={classes.dropDown}
                />
              )
            )
          })}
      </Grid>
    )
  }

  return (
    <TabDropdownMainWrapper
      className="base-tab-dropdown"
      container
      direction="row"
    >
      {renderDropdown()}
      {renderTabMenu()}
    </TabDropdownMainWrapper>
  )
}

export { TabDropdown }
export default TabDropdown
