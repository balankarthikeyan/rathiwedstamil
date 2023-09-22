import styled from 'styled-components'
import { Grid } from '@material-ui/core'

export const SearchDropdownWrapper = styled(Grid)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
  width: 100%;
  // padding: 0px 24px;
  box-sizing: border-box;
  padding-bottom: 24px;
 
  .base-accordion {
    box-shadow: none;
    
    border-radius: 5px;
    overflow: unset;
    position:relative;
    
    
    &.active{
      border-radius: 5px;
      border-bottom: 0;
      z-index: 999;
      filter: drop-shadow(0px 1px 8px #D9D9D9);
      .cls-header-kit{
        border-radius: 0;
        border: 0;
      }
      .cls-acordion-container {
        background:#fff;
        width:100%;
        position:absolute;
        top:0;
        z-index: 999;
        border-radius: 5px;
        border-top: 0;
        border: 1px solid #eceff3;
        min-height: 210px;
      }
    }

    &.inactive{
      .cls-header-kit{
        border: 1px solid #eceff3;
      }
      height: 72px;
      z-index: 9;
    }
  }

   
  .cls-Location-kit.base-accordion.active .cls-acordion-container,.cls-Language-kit.base-accordion.active .cls-acordion-container {
    min-height: 310px;
    
    .cls-header-kit {
      height: 100%;
    }
  }
  
  

  @media (max-width: 1360px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
}
`
export const SearchOverlay = styled(Grid)`
  width: 100vw;
  height: 100vh;

  // background: #00000021;
  background: #00000000;
  position: fixed;
  top: 0;
  left: 0;
`
