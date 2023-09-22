import React, { useState } from 'react'
import { TextField, Button, ButtonGroup, Typography } from '@material-ui/core'
import styled from 'styled-components'
import * as Utils from '@utils'
const TabFieldMainWrapper = styled.div`
  display: flex;
`
const TextFieldMainWrapper = styled.span`
  display: flex;
  flex-direction: column;
`
const Error = styled(Typography)`
  color: red;
  margin-top: 3px !important;
`
const TabInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const TabButton = styled(Button)`
  &.selected {
    pointer-events: none;
  }
  height: 40px;
`
const TextFieldWrapper = styled(TextField)`
  width: 218px;
  height: 36px;
`
function TabTextField(props) {
  const defaultList = ['one', 'two']
  const {
    error = '',
    defaultValue = '',
    list = defaultList,
    activeMenuIdx = 0,
    onUpdate = () => '',
    textBoxType = 'number',
    internalValidation = true,
  } = props || {}

  const [isTextBoxType, setTextBoxType] = React.useState(textBoxType)
  const [activeTabIdx, setActiveTabIdx] = React.useState(activeMenuIdx)
  const [getTextValue, setTextValue] = useState(defaultValue)
  const [isType, setType] = useState(false)

  React.useEffect(() => {
    const objListKit = list[activeTabIdx]
    onUpdate({
      value: getTextValue,
      type: objListKit,
    })
  }, [activeTabIdx, getTextValue])

  const renderTextField = () => {
    return (
      <>
        {list &&
          list.map((item, index) => {
            const { list: listKit = [] } = item || {}
            return (
              activeTabIdx === index && (
                <React.Fragment key={`${JSON.stringify(item)}_${index}`}>
                  <TabInputWrapper key={`base-tabinput-${index}`}>
                    <TextFieldWrapper
                      type={isTextBoxType}
                      name="value"
                      margin="dense"
                      variant="outlined"
                      defaultValue={getTextValue}
                      placeholder="number"
                      onChange={e => {
                        setTextValue(e.target.value)
                        setType(true)
                      }}
                    />
                    {internalValidation &&
                      isType &&
                      Utils.JSUtils.isEmpty(getTextValue) && (
                        <Error>{`* is required`}</Error>
                      )}
                    {Utils.JSUtils.isEmpty(error) === false && (
                      <Error>{error}</Error>
                    )}
                  </TabInputWrapper>
                </React.Fragment>
              )
            )
          })}
      </>
    )
  }

  const RenderButton = () => {
    const onTabMenuClick = e => {
      e.preventDefault()
      const curMenuIdx = +e.currentTarget.getAttribute('data-key')
      setActiveTabIdx(curMenuIdx === activeTabIdx ? -1 : curMenuIdx)
    }
    return (
      <ButtonGroup
        disableElevation
        color="primary"
        style={{ marginLeft: '16px', marginTop: '10px' }}
      >
        {list &&
          list.map((item, index) => {
            return (
              <TabButton
                key={`${JSON.stringify(item)}_${index}`}
                className={`${activeTabIdx === index ? 'selected' : ''}`}
                variant={`${activeTabIdx === index ? 'contained' : ''}`}
                data-key={index}
                onClick={onTabMenuClick}
                style={{ height: '36px' }}
              >
                {item}
              </TabButton>
            )
          })}
      </ButtonGroup>
    )
  }
  return (
    <TabFieldMainWrapper>
      {renderTextField()}
      {RenderButton()}
    </TabFieldMainWrapper>
  )
}
export { TabTextField }
export default TabTextField
