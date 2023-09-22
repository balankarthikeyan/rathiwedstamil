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
} from './styles'
import { useTimeLine } from './useTimeLine'
import * as GlobalFixture from '@fixture'
import {
  renderChipList,
  customRenderHeader,
  customRenderContainer,
} from './renderProps'

function TimeLine(props) {
  const { onUpdate = () => '', list = [], expandTrigger } = props || {}

  const {
    count,
    setCount,
    timeLineList,
    setTimeLineList,
    updateCount,
  } = useTimeLine({ list })

  const stateProps = {
    timeLineList,
    setTimeLineList,
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
export { TimeLine }
export default TimeLine
