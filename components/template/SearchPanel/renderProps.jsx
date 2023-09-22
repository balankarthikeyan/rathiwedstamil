import React from 'react'
import { Typography, Grid, Button } from '@material-ui/core'
import * as IconGallery from '@iconsGallery'
import * as Adm from '@adm'
import * as Utils from '@utils'
import Router from 'next/router'
import { IconTextButton } from './styles'

export const IconKit = () => (
  <Grid>
    <IconTextButton startIcon={<IconGallery.SaveAppIcon />}>
      <label>Save</label>
    </IconTextButton>
    <IconTextButton startIcon={<IconGallery.MoreAppIcon />}>
      <label>More</label>
    </IconTextButton>
  </Grid>
)
export const SearchRadioList = props => {
  const {
    setSearchType,
    radioActiveIndex,
    setRadioActiveIndex,
    setSearchResultData,
  } = props || {}
  const defaultRadioList = [
    {
      name: 'Simple Search',
    },
    {
      name: 'Advanced Search',
    },
    {
      name: 'Pro Search',
    },
  ]
  return (
    <>
      <Adm.RadioButtonList
        activeMenuIdx={radioActiveIndex}
        list={defaultRadioList}
        onUpdate={radioProps => {
          const { activeRadioIdx } = radioProps || {}
          setSearchType(activeRadioIdx)
          setRadioActiveIndex(activeRadioIdx)
          setSearchResultData({})
        }}
      />
    </>
  )
}
