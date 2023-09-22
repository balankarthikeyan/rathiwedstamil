import React from 'react'
import styled from 'styled-components'
import * as Adm from '@adm'
import { Grid, Typography } from '@material-ui/core'

const StyledKeyInputWrapper = styled(Grid)`
  width: 100%;
  max-width: 420px;
`
const StyledKeyTitle = styled(Typography)`
  font-size: 13px;
  font-weight: 700;
  color: #000;
  margin-bottom: 10px;
`
const StyledKeySubTitle = styled(Typography)`
  font-size: 13px;
  font-weight: 500;
  color: #4c4c4c;
  margin-bottom: 10px;
`

const StyledInputField = styled.input`
  border: 1px solid #d2dbe8;
  height: 36px;
  width: 100%;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 6px 6px 6px 10px;
`

function KeywordInputField(props) {
  const {
    placeholder = 'Type to include keyword',
    title = 'Keyword position',
    subTitle = 'Enter Keyword included within',
    onUpdate = () => '',
    className = '',
  } = props || {}
  return (
    <StyledKeyInputWrapper className={className}>
      {title.length > 0 && <StyledKeyTitle>{title}</StyledKeyTitle>}
      {subTitle.length > 0 && <StyledKeySubTitle>{subTitle}</StyledKeySubTitle>}
      <StyledInputField
        placeholder={placeholder}
        onChange={e => {
          let InputValue = e.currentTarget.value
          onUpdate({ value: InputValue })
        }}
      />
    </StyledKeyInputWrapper>
  )
}

const KeywordSensetiveRadioList = props => {
  const {
    setSearchType,
    radioActiveIndex,
    setRadioActiveIndex,
    setSearchResultData,
    onUpdate = () => '',
  } = props || {}
  const defaultRadioList = [
    {
      name: 'Non sensetive',
    },
    {
      name: 'Case sensitive',
    },
  ]
  return (
    <>
      <Adm.RadioButtonList
        activeMenuIdx={0}
        list={defaultRadioList}
        onUpdate={radioProps => {
          const { activeRadioIdx } = radioProps || {}
          // console.log(radioProps)
          onUpdate(radioProps)
        }}
      />
    </>
  )
}

export { KeywordInputField, KeywordSensetiveRadioList }
