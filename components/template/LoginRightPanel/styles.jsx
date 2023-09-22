import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import styled from 'styled-components'

export const SwiperParentWrapper = styled(Grid)`
  width: 100%;
  margin: auto;
  align-items: center;
  .swiper .swiper-pagination .swiper-pagination-bullet {
    background-color: #ffffff;
  }
  span.swiper-pagination-bullet.swiper-pagination-bullet-active {
    width: 20px !important;
    border-radius: 6px !important;
  }
`

export const SwiperUI = styled.div`
  width: 100%;
  height: 560px;
  padding-bottom: 30px;

  img {
    margin: auto;
    display: flex;
  }
`

export const BannerTitle = styled(Typography)`
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  width: 300px;
  margin: auto;
`
export const BannerSubTitle = styled(Typography)`
  color: #ffffff;
  text-align: center;
  width: 300px;
  margin: auto;
`
