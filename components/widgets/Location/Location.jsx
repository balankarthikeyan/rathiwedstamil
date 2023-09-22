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
import { useLocation } from './useLocation'
import * as GlobalFixture from '@fixture'
import {
  renderChipList,
  customRenderHeader,
  customRenderContainer,
} from './renderProps'

function Location(props) {
  const { onUpdate = () => '', list = [], expandTrigger = () => '' } =
    props || {}

  const SearchInputBoxRef = React.createRef()
  const {
    count,
    setCount,
    locationList,
    setLocationList,
    updateCount,
    locationSearchText,
    setLocationSearchText,
    isSelectAll,
    setSelectAll,
  } = useLocation({ list })

  const stateProps = {
    locationList,
    setLocationList,
    count,
    setCount,
    onUpdate,
    updateCount,
    locationSearchText,
    setLocationSearchText,
    isSelectAll,
    setSelectAll,
    SearchInputBoxRef,
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
export { Location }
export default Location
