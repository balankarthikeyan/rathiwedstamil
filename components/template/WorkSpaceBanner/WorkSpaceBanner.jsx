import React from 'react'
import { Typography } from '@material-ui/core'
import * as IconGallery from '@iconsGallery'
import * as Utils from '@utils'
import * as Adm from '@adm'
import {
  BannerWrapper,
  BannerImg,
  TimerParentWrapper,
  TimerWrapper,
  UpdateTextWrapper,
  CustomizingButton,
  SearchBgWrapper,
  SearchInnerWrapper,
  SearchButtonWrapper,
  SearchTitleWrapper,
} from './styles'

const TimerKit = ({ updateText, time }) => (
  <TimerParentWrapper>
    <TimerWrapper>{time}</TimerWrapper>
    <UpdateTextWrapper>{updateText}</UpdateTextWrapper>
  </TimerParentWrapper>
)

const CustomWorkSpaceKit = () => (
  <CustomizingButton startIcon={<IconGallery.SettingsIcon />}>
    <span className="cls-text">Customise Workspace</span>
  </CustomizingButton>
)

const SearchKit = () => (
  <SearchBgWrapper>
    <SearchTitleWrapper>Search</SearchTitleWrapper>
    <SearchInnerWrapper>
      <Adm.Link
        href={'/search'}
        renderChildren={() => {
          return (
            <SearchButtonWrapper
              variant="contained"
              color="primary"
              startIcon={<IconGallery.SearchIcon />}
            >
              Begin Your Search
            </SearchButtonWrapper>
          )
        }}
      />
    </SearchInnerWrapper>
  </SearchBgWrapper>
)

function WorkSpaceBanner(props) {
  const config = {
    imageUrl: '/static/bnr_nature.jpg',
    updateText: `You have 3 new updates`,
  }
  const [time, setTime] = React.useState('00:00')

  React.useEffect(() => {
    let timerInterval = null
    timerInterval = setInterval(() => {
      const currentDate = new Date()
      const { fullTimeString = '' } = Utils.JSUtils.getDateKit(currentDate)
      setTime(fullTimeString)
    }, 1000)

    return () => {
      clearInterval(timerInterval)
    }
  }, [])

  const stateProps = { ...config, time }
  return (
    <>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        style={{
          fontWeight: 'bold',
          fontSize: '40px',
          margin: '0',
          padding: '20px',
        }}
      >
        My Workspace
      </Typography>
      <BannerWrapper>
        <TimerKit {...stateProps} />
        <CustomWorkSpaceKit />
        <SearchKit />
        <BannerImg src={config.imageUrl} />
      </BannerWrapper>
    </>
  )
}

export { WorkSpaceBanner }
export default WorkSpaceBanner
