import * as React from 'react'
import * as Utils from '@utils'

import styled from 'styled-components'

const SwiperKit = styled.div`
  position: relative;
  .swiper {
    margin: 20px auto;

    .swiper-button-prev,
    .swiper-button-next {
      &::after {
        display: none;
      }

      &:focus {
        outline: unset;
      }
    }

    .swiper-pagination {
      width: 100%;
      height: 100%;
      position: relative;

      .swiper-pagination-bullet {
        background-color: white;
        width: 10px;
        height: 10px;
        margin-right: 6px;
      }

      .swiper-pagination-bullet-active {
        outline: none;
      }
    }

    .swiper-disable .swiper-wrapper {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .swiper .swiper-disable .swiper-wrapper {
    transform: none !important;
  }
  .swiper-button-next.swiper-button-disabled {
    display: none;
  }
  .swiper-button-prev.swiper-button-disabled {
    display: none;
  }

  .swiper-button-prev.swiper-button-disabled {
    ~ .swiper-button-next.swiper-button-disabled {
      ~ .swiper-pagination {
        display: none;
      }
    }
  }
`

const defaultRenderPagination = () => {
  return <div className="swiper-pagination" />
}

const defaultRenderArrow = props => (
  <>
    <div className="swiper-button-prev">{`<`}</div>
    <div className="swiper-button-next">{`>`}</div>
  </>
)

export { defaultRenderPagination }

function Carousel(props) {
  const {
    id = '',
    settings = {},
    children,
    renderPagination = defaultRenderPagination,
    renderArrow = defaultRenderArrow,
    className = '',
    identifier = '',
    widgetName = '',
  } = props || {}
  const {
    clickable,
    type = '',
    mbSlidesPerView = settings.mobileColSpan,
    mbSpaceBetween = settings.gridGap,
    mbSlidesPerGroup = 1,
    tbSlidesPerView = settings.tabletColSpan,
    tbSpaceBetween = settings.gridGap,
    tbSlidesPerGroup = 1,
    dkSlidesPerView = settings.desktopColSpan,
    dkSpaceBetween = settings.gridGap,
    dkSlidesPerGroup = 1,
    disableSwiper = false,
    isLoopCarousel = settings.isLoopCarousel,
    ...rest
  } = settings
  let toggleSlide = 0
  if (typeof window !== 'undefined') {
    if (window.innerWidth > 1023) toggleSlide = settings.toggleSlideDK
    else if (window.innerWidth > 767) toggleSlide = settings.toggleSlideTB
    else toggleSlide = settings.toggleSlideMB
  } else {
    toggleSlide = settings.toggleSlideDK
  }

  const disableArrow = settings.disableArrow || !toggleSlide
  const disablePagination = settings.disableBullets || !toggleSlide
  let swiper = null

  const breakpoints = {
    320: {
      slidesPerView: mbSlidesPerView,
      spaceBetween: mbSpaceBetween,
      slidesPerGroup: mbSlidesPerGroup,
    },
    769: {
      slidesPerView: tbSlidesPerView,
      spaceBetween: tbSpaceBetween,
      slidesPerGroup: tbSlidesPerGroup,
    },
    // 901: {
    //   slidesPerView: tbSlidesPerView,
    //   spaceBetween: tbSpaceBetween,
    //   slidesPerGroup: tbSlidesPerGroup,
    // },
    1081: {
      slidesPerView: dkSlidesPerView,
      spaceBetween: dkSpaceBetween,
      slidesPerGroup: dkSlidesPerGroup,
    },
  }
  React.useEffect(() => {
    if (swiper !== null) {
      swiper.reInit()
    }
  }, [identifier])

  React.useEffect(() => {
    if (typeof Swiper === 'function' && identifier != '') {
      const domEl = document.querySelector(`.${identifier}`)
      const swiperElem = domEl.querySelector(`.swiper-container`)
      const prevEl = domEl.querySelector('.swiper-button-prev')
      const nextEl = domEl.querySelector('.swiper-button-next')
      const paginationEl = domEl.querySelector('.swiper-pagination')

      const pagination = {
        el: paginationEl,
        type: type.toLowerCase() || 'bullets',
        clickable: true,
      }

      let swiperOptions = {
        ...rest,
        observer: true,
        loop: isLoopCarousel && settings.toggleSlideDK,
        initialSlide: 0,
        autoplay: false,
        autoplayStopOnLast: false,
        centeredSlides: false,
        allowSlidePrev: toggleSlide,
        allowSlideNext: toggleSlide,
        navigation: {
          prevEl,
          nextEl,
        },
        pagination,
        breakpoints,
      }
      if (disableSwiper === true) {
        swiperOptions = {
          ...swiperOptions,
          loop: false,
          autoplayDisableOnInteraction: false,
          keyboardControl: false,
          mousewheelControl: false,
          paginationClickable: false,
          noSwiping: true,
        }
      }
      swiper = new Swiper(swiperElem, swiperOptions)
    }

    return () => {
      if (swiper !== null && typeof swiper.destroy === 'function') {
        swiper.destroy(true, true)
        swiper = null
      }
    }
  })
  const dataClass = `ui-${identifier.split('-')[1]}`
  const widgetNameCss = ` ${widgetName === '' ? '' : `.${widgetName}`} `

  let swiperStyling = `
  @media only screen and (min-width: 1081px)
  {
   ${widgetNameCss} .${identifier} .swiper-disable .swiper-slide:nth-child(${dkSlidesPerView}n) 
    {
      margin-right: 0px !important;
      margin-bottom: ${dkSpaceBetween}px; 
    }
  }
  @media (max-width: 1080px) and (min-width: 769px)
  {
    ${widgetNameCss} .${identifier} .swiper-disable .swiper-slide:nth-child(${tbSlidesPerView}n) {
      margin-right: 0px !important;
      margin-bottom: ${tbSpaceBetween}px;
    }
  }
  @media (max-width: 768px)
  {
    ${widgetNameCss} .${identifier} .swiper-disable .swiper-slide:nth-child(${mbSlidesPerView}n) {
      margin-right: 0px !important;
      margin-bottom: ${mbSpaceBetween}px;
    } 
  }
`
  if (swiperStyling.length > 0) {
    swiperStyling = Utils.JSUtils.minifyString(swiperStyling)
  }
  return (
    <>
      <style>{swiperStyling}</style>
      <SwiperKit>
        <div
          id={id}
          className={`swiper ${identifier} ${dataClass} ${className}`}
        >
          <div
            className={`swiper-container ${
              disableSwiper === true ? 'swiper-no-swiping swiper-disable' : ''
            }`}
          >
            <div className={`swiper-wrapper`}>{children}</div>
          </div>
          {disableSwiper || (disableArrow === false && renderArrow())}
          {disableSwiper || (disablePagination === false && renderPagination())}
        </div>
      </SwiperKit>
    </>
  )
}

export { Carousel }
export default Carousel
