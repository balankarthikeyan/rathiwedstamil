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
  StyledSocialTitle,
} from './styles'
import { useMediaType } from './useMediaType'

import * as GlobalFixture from '@fixture'

export const renderChipList = props => {
  const {
    classes,
    expanded,
    setExpanded,
    handleExpandClick,
    label,
    mediaList,
    setMediaList,
    socialList,
    setSocialList,
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
      {mediaList &&
        mediaList.map((item, index) => {
          const { name, selected = false } = item || {}
          const MediaChipUI = () => (
            <React.Fragment key={index}>
              <SearchChip
                label={name}
                className={`${selected ? 'active' : ''} ${
                  expanded ? 'expanded' : 'closed'
                }`}
                onClick={() => {
                  const data = mediaList.filter(item => item.name === name)
                  const { selected = false } = data[0]
                  data[0]['selected'] = !selected
                  setMediaList([...mediaList])
                  onUpdate({ mediaList, socialList })
                  updateCount({
                    media: mediaList,
                    social: socialList,
                  })
                }}
                clickable
              />
            </React.Fragment>
          )
          return expanded ? (
            <MediaChipUI />
          ) : 3 > index ? (
            <MediaChipUI />
          ) : (
            <></>
          )
        })}

      {expanded && (
        <>
          <StyledSocialTitle>Social Media</StyledSocialTitle>
          {socialList &&
            socialList.map((item, index) => {
              const { name, selected = false } = item || {}
              const SocialChipUI = () => (
                <React.Fragment key={index}>
                  <SearchChip
                    label={name}
                    className={`${selected ? 'active' : ''}`}
                    onClick={() => {
                      const data = socialList.filter(item => item.name === name)
                      const { selected = false } = data[0]
                      data[0]['selected'] = !selected
                      setSocialList([...socialList])
                      onUpdate({ mediaList, socialList })
                      updateCount({
                        media: mediaList,
                        social: socialList,
                      })
                    }}
                    clickable
                  />
                </React.Fragment>
              )
              return <SocialChipUI />
            })}
        </>
      )}

      {expanded === false && (
        <Tooltip
          placement="bottom"
          title={0 < count ? 'Selected Items Available' : 'More'}
        >
          <MoreChip {...moreAttribute} />
        </Tooltip>
      )}
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
    mediaList,
    setMediaList,
    socialList,
    setSocialList,
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
