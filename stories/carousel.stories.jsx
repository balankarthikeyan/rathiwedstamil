import * as React from 'react'
import { createStoryModule } from './base.stories'
import * as Widgets from '@widgets'
import styled from 'styled-components'
const SwiperUI = styled.div`
  width: 100%;
  height: 200px;
  background: pink;
`
const carouselStories = createStoryModule('carousel')
carouselStories.add('Button', () => {
  const settings = {
    desktopColSpan: 1,
    tabletColSpan: 3,
    mobileColSpan: 2,
    gridGap: 30,
    disableSwiper: false,
    disableArrow: false,
    disableBullets: false,
    isLoopCarousel: false,
    toggleSlideDK: true,
    toggleSlideTB: true,
    toggleSlideMB: true,
    spaceBetween: 0,
    grabCursor: true,
  }
  return (
    <Widgets.Carousel
      settings={settings}
      identifier={'id-compare-kit'}
      className="compare-prdlist-wrapper"
    >
      <SwiperUI className="swiper-slide">1</SwiperUI>
      <SwiperUI className="swiper-slide">2</SwiperUI>
      <SwiperUI className="swiper-slide">3</SwiperUI>
      <SwiperUI className="swiper-slide">4</SwiperUI>
    </Widgets.Carousel>
  )
})
