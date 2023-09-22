import React from 'react'
import * as IconGallery from '@iconsGallery'
import * as Adm from '@adm'
import * as Utils from '@utils'
import { ExpandMoreIcon, ExpandLessIcon } from '@iconsGallery'
import {
  StyledCardHeader,
  StyledCardMenuHeader,
  SearchIconButton,
  SearchChip,
  MoreChip,
  StyledSocialTitle,
} from './styles'
import { useMediaType } from './useMediaType'
import * as GlobalFixture from '@fixture'
import {
  renderChipList,
  customRenderHeader,
  customRenderContainer,
} from './renderProps'

function MediaType(props) {
  const { onUpdate = () => '', mediaType = {}, expandTrigger } = props || {}
  const { media = [], social = [] } = mediaType
  const {
    count,
    setCount,
    mediaList,
    setMediaList,
    socialList,
    setSocialList,
    updateCount,
  } = useMediaType({ media, social })

  const stateProps = {
    mediaList,
    setMediaList,
    socialList,
    setSocialList,
    count,
    setCount,
    onUpdate,
    updateCount,
  }

  return (
    <Adm.AccordianPanel
      expandTrigger={expandTrigger}
      renderHeader={headerProps =>
        customRenderHeader({
          ...headerProps,
          ...stateProps,
        })
      }
      renderContainer={containerProps =>
        customRenderContainer({
          ...containerProps,
          ...stateProps,
        })
      }
      {...props}
    />
  )
}
export { MediaType }
export default MediaType
