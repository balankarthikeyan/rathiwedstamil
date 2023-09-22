import React from 'react'
import * as IconGallery from '@iconsGallery'
import * as Adm from '@adm'
import * as Utils from '@utils'
import {
  Typography,
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Input,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CardActions,
  CardHeader,
  CardContent,
  Collapse,
  Grid,
  Tooltip,
} from '@material-ui/core'
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

export const renderChipList = props => {
  const {
    classes,
    expanded,
    setExpanded,
    handleExpandClick,
    label,
    timeLineList,
    setTimeLineList,
    onUpdate,
    count,
    setCount,
    updateCount,
  } = props || {}

  let moreAttribute = {
    onClick: () => {
      handleExpandClick()
    },
    clickable: true,
  }

  if (0 < count) {
    moreAttribute = {
      ...moreAttribute,
      label: `+${count}`,
      className: 'cls-more-count',
    }
  } else {
    moreAttribute = {
      ...moreAttribute,
      className: 'cls-more-icon',
      icon: <IconGallery.MoreIcon />,
    }
  }
  return (
    <>
      {timeLineList &&
        timeLineList.map((item, index) => {
          const { name, selected = false } = item || {}
          const TimeLineChipUI = () => (
            <SearchChip
              label={name}
              className={`${selected ? 'active' : ''} ${
                expanded ? 'expanded' : 'closed'
              }`}
              onClick={() => {
                const dataList = timeLineList.map((item, idx) => {
                  const { selected = false, ...restProps } = item
                  let isSelected = {}
                  if (index === idx) {
                    isSelected = { selected: true }
                  }
                  return { ...restProps, ...isSelected }
                })
                setTimeLineList([...dataList])
                onUpdate({ timeLineList: dataList })
                updateCount({
                  timeLine: dataList,
                })
              }}
              clickable
            />
          )
          return <TimeLineChipUI />
        })}
    </>
  )
}

export const customRenderHeader = props => {
  const {
    classes,
    expanded,
    setExpanded,
    handleExpandClick,
    label,
    timeLineList,
    setTimeLineList,
    onUpdate,
    count,
    setCount,
    updateCount,
  } = props || {}

  return (
    <StyledCardHeader className={'cls-header-kit'}>
      <StyledCardMenuHeader onClick={handleExpandClick}>
        <p>{label}</p>
        <SearchIconButton onClick={handleExpandClick}>
          {expanded ? (
            <IconGallery.UpArrowIcon2 />
          ) : (
            <IconGallery.DownArrowIcon2 />
          )}
        </SearchIconButton>
      </StyledCardMenuHeader>
      {renderChipList({ ...props })}
    </StyledCardHeader>
  )
}

export const customRenderContainer = props => {
  const { classes, expanded, setExpanded, handleExpandClick, label } =
    props || {}
  return (
    <Grid className={'cls-acordion-container'}>
      {customRenderHeader({
        ...props,
      })}
    </Grid>
  )
}
