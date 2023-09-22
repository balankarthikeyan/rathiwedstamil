import React from 'react'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'

export const BackgroundWrapper = styled(Grid)`
  width: 100%;
  height: 456px;
  border: 1px solid #eceff3;
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
`
export const TextAbstract = styled(Grid)`
  width: 100%;
  height: 10px;
  background: #ededed;
  margin-bottom: 10px;
`

const Abstract = props => (
  <BackgroundWrapper {...props}>
    <TextAbstract style={{ width: '50%' }} />
    <TextAbstract style={{ height: '20px' }} />
    <br />
    <br />
    <TextAbstract />
    <TextAbstract />
    <TextAbstract />
  </BackgroundWrapper>
)

export { Abstract }
export default Abstract
