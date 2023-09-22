import * as React from 'react'
import * as Adm from '@adm'
import { FooterWrapper, CopyText, FooterLeftWrapper } from './styles'

function Footer() {
  return (
    <FooterWrapper>
      <FooterLeftWrapper>
        <div>
          <Adm.CustomLogo />
        </div>
        <CopyText>copyrights@2021</CopyText>
      </FooterLeftWrapper>
    </FooterWrapper>
  )
}

export { Footer }
export default Footer
