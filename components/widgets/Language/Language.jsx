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
import { useLanguage } from './useLanguage'
import * as GlobalFixture from '@fixture'
import {
  renderChipList,
  customRenderHeader,
  customRenderContainer,
} from './renderProps'

function Language(props) {
  const { onUpdate = () => '', list = [], expandTrigger = () => '' } =
    props || {}

  const SearchInputBoxRef = React.createRef()
  const {
    count,
    setCount,
    languageList,
    setLanguageList,
    updateCount,
    languageSearchText,
    setLanguageSearchText,
    isSelectAll,
    setSelectAll,
  } = useLanguage({ list })

  const stateProps = {
    languageList,
    setLanguageList,
    count,
    setCount,
    onUpdate,
    updateCount,
    languageSearchText,
    setLanguageSearchText,
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
export { Language }
export default Language
