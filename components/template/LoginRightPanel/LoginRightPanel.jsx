import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import * as Widgets from '@widgets'
import * as StyledDOM from './styles'

function LoginRightPanel() {
  const settings = {
    desktopColSpan: 1,
    tabletColSpan: 1,
    mobileColSpan: 1,
    gridGap: 0,
    disableSwiper: false,
    disableArrow: false,
    disableBullets: false,
    isLoopCarousel: false,
    toggleSlideDK: true,
    toggleSlideTB: true,
    toggleSlideMB: true,
    spaceBetween: 0,
    grabCursor: true,
    disableArrow: true,
  }
  const SwiperKit = () => (
    <StyledDOM.SwiperUI className="swiper-slide">
      <img src="/static/banner_login_img.png" />
      <StyledDOM.BannerTitle variant="h4">
        Get AI Powered Analytics
      </StyledDOM.BannerTitle>
      <StyledDOM.BannerSubTitle>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </StyledDOM.BannerSubTitle>
    </StyledDOM.SwiperUI>
  )
  return (
    <StyledDOM.SwiperParentWrapper>
      <Widgets.Carousel settings={settings} identifier={'id-compare-kit'}>
        <SwiperKit />
        <SwiperKit />
        <SwiperKit />
        <SwiperKit />
        <SwiperKit />
      </Widgets.Carousel>
    </StyledDOM.SwiperParentWrapper>
  )
}

export { LoginRightPanel }
export default LoginRightPanel
