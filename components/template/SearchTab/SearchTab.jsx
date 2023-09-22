import React from 'react'
import * as Adm from '@adm'
import {
  StyledTabHeaderWrapper,
  StyledTabButton,
  StyledTabMainWrapper,
} from './styles'
import { KeywordProminence } from './KeywordProminence'
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
              variant={`${activeTabIdx === index ? 'contained' : ''}`}
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
  } = props || {}

  return (
    <>
      {activeTabIdx === 0 && (
        <KeywordProminence
          onUpdate={props => {
            console.log('KeywordProminence', props)
          }}
          {...props}
        />
      )}
      {activeTabIdx === 1 && <h1>Source Prominence Coming Soon</h1>}
    </>
  )
}

function SearchTab(props) {
  const defaultList = [
    {
      tabName: 'Keyword Prominence',
    },
    {
      tabName: 'Source Customisation',
    },
  ]
  return (
    <StyledTabMainWrapper>
      <Adm.Tab
        list={defaultList}
        renderTabMenu={tabmenuProps =>
          customRenderTabMenu({ ...tabmenuProps, ...props })
        }
        renderContainer={containerProps =>
          customRenderContainer({ ...containerProps, ...props })
        }
        onUpdate={props => {
          console.log(props)
        }}
      />
    </StyledTabMainWrapper>
  )
}

export { SearchTab }
export default SearchTab
