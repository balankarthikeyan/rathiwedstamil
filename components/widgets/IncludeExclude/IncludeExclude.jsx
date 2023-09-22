import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import * as Adm from '@adm'
import * as Utils from '@utils'
import * as IconGallery from '@iconsGallery'
import {
  StyledMainWrapper,
  StyledTabHeaderWrapper,
  StyledTabButton,
  StyledInputField,
  StyledTooltipWrapper,
  StyledTitle,
} from './styles'
import { IEInputField } from './IEInputField'
import { ToolTipChip } from './ToolTipChip'

const customRenderTabMenu = props => {
  const {
    activeTabIdx,
    setActiveTabIdx,
    onTabMenuClick,
    fetchList,
    setFetchList,
  } = props || {}
  return (
    <StyledTabHeaderWrapper>
      {fetchList &&
        fetchList.map((item, index) => {
          const { tabName } = item || {}
          return (
            <StyledTabButton
              className={`${activeTabIdx === index ? 'selected' : ''}`}
              variant={`outlined`}
              data-key={index}
              key={`${JSON.stringify(item)}_${index}`}
              onClick={onTabMenuClick}
              style={{ height: '36px' }}
            >
              {tabName}
            </StyledTabButton>
          )
        })}
    </StyledTabHeaderWrapper>
  )
}

const customRenderContainer = props => {
  const {
    activeTabIdx,
    setActiveTabIdx,
    onTabMenuClick,
    fetchList,
    setFetchList,
    listIncludeExclude,
    setListIncludeExclude,
    onUpdate,
    isIncludeExclude,
    setIncludeExclude,
    defaultIsIncludeExclude,
  } = props || {}

  return (
    <>
      {activeTabIdx === 0 && (
        <IEInputField
          defaultValue={listIncludeExclude.include.join(',')}
          placeholder="Type to include keyword"
          onUpdate={({ value }) => {
            // console.log(value)
            const valueList = {
              ...listIncludeExclude,
              include: value,
            }
            setListIncludeExclude(valueList)
            onUpdate({ value: valueList })
            setIncludeExclude({
              ...isIncludeExclude,
              include: {
                isOpen: true,
                anchorEl: document.querySelector('.cls-radiobutton-include'),
              },
            })
            setTimeout(() => {
              setIncludeExclude({
                ...defaultIsIncludeExclude,
              })
            }, 1000)
          }}
        />
      )}
      {activeTabIdx === 1 && (
        <IEInputField
          defaultValue={listIncludeExclude.exclude.join(',')}
          placeholder="Type to exclude keyword"
          onUpdate={({ value }) => {
            const valueList = {
              ...listIncludeExclude,
              exclude: value,
            }
            setListIncludeExclude(valueList)
            onUpdate({ value: valueList })
            setIncludeExclude({
              ...isIncludeExclude,
              exclude: {
                isOpen: true,
                anchorEl: document.querySelector('.cls-radiobutton-exclude'),
              },
            })
            setTimeout(() => {
              setIncludeExclude({
                ...defaultIsIncludeExclude,
              })
            }, 1000)
          }}
        />
      )}
    </>
  )
}

function IncludeExclude(props) {
  const {
    onUpdate = () => '',
    defaultIEList = {
      include: ['covid', 'india'],
      exclude: ['tree', 'child'],
    },
  } = props || {}

  const defaultList = [
    {
      tabName: 'Include',
    },
    {
      tabName: 'Exclude',
    },
  ]
  const defaultIsIncludeExclude = {
    include: {
      isOpen: false,
      anchorEl: null,
    },
    exclude: {
      isOpen: false,
      anchorEl: null,
    },
  }
  const [isIncludeExclude, setIncludeExclude] = React.useState(
    defaultIsIncludeExclude
  )
  const [listIncludeExclude, setListIncludeExclude] = React.useState(
    defaultIEList
  )

  const stateProps = {
    listIncludeExclude,
    setListIncludeExclude,
    onUpdate,
    isIncludeExclude,
    setIncludeExclude,
    defaultIsIncludeExclude,
  }

  const tabAttributes = {
    list: defaultList,
    renderTabMenu: tabMenuProps =>
      customRenderTabMenu({ ...tabMenuProps, ...stateProps }),
    renderContainer: containerProps =>
      customRenderContainer({ ...containerProps, ...stateProps }),
    onUpdate: props => {
      // console.log(props)
    },
  }

  return (
    <StyledMainWrapper className="cls-IncludeExclude-kit">
      <StyledTitle>Keyword in headline</StyledTitle>
      <Adm.Tab {...tabAttributes} />
      <StyledTooltipWrapper>
        <ToolTipChip
          defaultAnchorEl={isIncludeExclude?.include.anchorEl}
          defaultIsOpen={isIncludeExclude?.include.isOpen}
          list={listIncludeExclude.include}
          onUpdate={({ value }) => {
            const valueList = {
              ...listIncludeExclude,
              include: value,
            }
            setListIncludeExclude(valueList)
            onUpdate({ value: valueList })
          }}
        />
        <ToolTipChip
          defaultAnchorEl={isIncludeExclude?.exclude.anchorEl}
          defaultIsOpen={isIncludeExclude?.exclude.isOpen}
          title="Exclude Keywords"
          type="exclude"
          list={listIncludeExclude.exclude}
          onUpdate={({ value }) => {
            const valueList = {
              ...listIncludeExclude,
              exclude: value,
            }
            setListIncludeExclude(valueList)
            onUpdate({ value: valueList })
          }}
        />
      </StyledTooltipWrapper>
    </StyledMainWrapper>
  )
}

export { IncludeExclude }
export default IncludeExclude
