import * as React from 'react'
import { createStoryModule } from './base.stories'
import { Grid, Card, Typography } from '@material-ui/core'
import * as IconsGallery from '@iconsGallery'
import styled from 'styled-components'
const Mainwrapper = styled(Grid)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 14px;
`
const IconCardWrapper = styled(Grid)`
  width: 100%;
  height: 200px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid #c5c5c5;
  position: relative;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    border: 1px solid orange;
    background: #fdcd88;
    .subwrapper {
      transform: scale(2.3);
    }
  }
`
const IconSubCardWrapper = styled(Grid)`
  height: 100px;
  display: flex;
  align-items: center;
  transition: transform 300ms ease;
  transform: scale(1.8);
`
const IconTypography = styled(Typography)`
  position: absolute;
  bottom: 8px;
`
const Input = styled.input`
  pointer-events: none;
  opacity: 0;
  transform: scale(0.2);
`
const admStories = createStoryModule('Icons')
admStories.add('List', () => {
  const iconKeyList = Object.keys(IconsGallery)
  return (
    <>
      <h1>Click and Copy the Component Name</h1>
      <Mainwrapper>
        {iconKeyList &&
          iconKeyList.map(CompName => {
            const DymaicIcon = IconsGallery[CompName]
            return (
              <IconCardWrapper
                onClick={e => {
                  var copyText = e.currentTarget.querySelector('input')
                  copyText.select()
                  copyText.setSelectionRange(0, 99999)
                  document.execCommand('copy')
                  alert('Copied the text: ' + copyText.value)
                }}
              >
                <IconSubCardWrapper className="subwrapper">
                  <DymaicIcon />
                </IconSubCardWrapper>
                <IconTypography>{CompName}</IconTypography>
                <Input defaultValue={CompName} />
              </IconCardWrapper>
            )
          })}
      </Mainwrapper>
    </>
  )
})
