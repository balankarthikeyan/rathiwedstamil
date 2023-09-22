import React from 'react'
import { Grid } from '@material-ui/core'
import { StyledTabContainerWrapper, StyledColumWrapper } from './styles'
import * as Widgets from '@widgets'
import * as Utils from '@utils'
import { KeywordInputField, KeywordSensetiveRadioList } from './renderProps'

function KeywordProminence(props) {
  const { onUpdate = () => '' } = props || {}
  const [isIntialLoad, setIntialLoad] = React.useState(false)
  const [keywordProminence, setKeywordProminence] = React.useState({
    includeExclude: {
      include: [],
      exclude: [],
    },
    keywordSensitiveTextBox: '',
    keywordSensitiveRadio: 'Non sensetive',
    keywordPositionTextBox: '',
    keywordSelectRange: [0, 100],
  })

  return (
    <StyledTabContainerWrapper>
      <StyledColumWrapper>
        <Widgets.IncludeExclude
          defaultIEList={keywordProminence?.includeExclude}
          onUpdate={({ value }) => {
            const list = {
              ...keywordProminence,
              includeExclude: { ...value },
            }
            setKeywordProminence(list)
            onUpdate({ value: list })
          }}
        />
        <KeywordInputField
          title="Keyword Sensitivity"
          subTitle=""
          onUpdate={({ value }) => {
            const list = {
              ...keywordProminence,
              keywordSensitiveTextBox: value,
            }
            setKeywordProminence(list)
            onUpdate({ value: list })
          }}
        />
        <KeywordSensetiveRadioList
          onUpdate={({ name = '' }) => {
            if (isIntialLoad) {
              const list = {
                ...keywordProminence,
                keywordSensitiveRadio: name,
              }
              setKeywordProminence(list)
              onUpdate({ value: list })
            } else {
              setIntialLoad(true)
            }
          }}
        />
      </StyledColumWrapper>
      <StyledColumWrapper>
        <KeywordInputField
          className="cls-keywordposition"
          onUpdate={({ value }) => {
            const list = {
              ...keywordProminence,
              keywordPositionTextBox: value,
            }
            setKeywordProminence(list)
            onUpdate({ value: list })
          }}
        />

        <Widgets.SelectRange
          className={`${
            Utils.JSUtils.isEmpty(keywordProminence?.keywordPositionTextBox) ===
            false
              ? ''
              : 'disabled'
          }`}
          onUpdate={value => {
            const list = {
              ...keywordProminence,
              keywordSelectRange: value,
            }
            setKeywordProminence(list)
            onUpdate({ value: list })
          }}
        />
      </StyledColumWrapper>
      <StyledColumWrapper>
        <h4>SPAM CHECKBOX COMING SOON</h4>
      </StyledColumWrapper>
    </StyledTabContainerWrapper>
  )
}

export { KeywordProminence }
export default KeywordProminence
