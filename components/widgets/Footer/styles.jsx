import styled from 'styled-components'

const FooterWrapper = styled.footer`
  background-color: #fff;
  padding: 24px;
  width: 100%;
  height: 80px;
  position: relative;
  display: flex;
  // position: fixed;
  // bottom: 0;

  svg {
    text {
      transform: translate(23px, 43px);
    }

    #Group_1-2 {
      display: none;
    }
  }
`
const FooterLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const CopyText = styled.p`
  color: #9b9b9b;
  font-size: 13px;
  padding: 0px;
  margin: 0;
`

export { FooterWrapper, CopyText, FooterLeftWrapper }
