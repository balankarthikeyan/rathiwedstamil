import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import * as IconGallery from '@iconsGallery'
import * as Adm from '@adm'
import * as Utils from '@utils'
import * as Widget from '@widgets'
import { SearchDropdownWrapper, SearchOverlay } from './styles'
import * as GlobalFixture from '@fixture'
function SearchAccordion(props) {
  const {
    searchType,
    setSearchType,
    isSearchMax,
    setSearchMax,
    searchSimpleContent,
    setSearchSimpleContent,
    searchTextBoxRef,
    mediaType,
    setMediaType,
    fetchLocation,
    setFetchLocation,
    fetchLanguage,
    setFetchLanguage,
    fetchTimeLine,
    setFetchTimeLine,
  } = props || {}

  const defaultOverlay = {
    location: false,
    mediaType: false,
    language: false,
    timeLine: false,
  }
  const [isOverlay, setOverlay] = React.useState(defaultOverlay)

  const stateProps = {
    searchType,
    setSearchType,
    isSearchMax,
    setSearchMax,
    searchSimpleContent,
    setSearchSimpleContent,
    searchTextBoxRef,
  }

  return (
    <>
      <SearchDropdownWrapper>
        <Widget.MediaType
          mediaType={mediaType}
          label="Media Type"
          onUpdate={({ mediaList = [], socialList = [] }) => {
            setMediaType({ media: mediaList, social: socialList })
          }}
          isOpen={isOverlay.mediaType}
          expandTrigger={expandTriggerProps => {
            const { expanded } = expandTriggerProps || {}
            setOverlay({
              ...isOverlay,
              ...defaultOverlay,
              mediaType: !expanded,
            })
          }}
        />
        <Widget.Location
          isOpen={isOverlay.location}
          expandTrigger={expandTriggerProps => {
            const { expanded } = expandTriggerProps || {}
            setOverlay({
              ...isOverlay,
              ...defaultOverlay,
              location: !expanded,
            })
          }}
          label="Location"
          list={fetchLocation}
          onUpdate={({ locationList }) => {
            setFetchLocation(locationList)
          }}
        />
        <Widget.Language
          isOpen={isOverlay.language}
          expandTrigger={expandTriggerProps => {
            const { expanded } = expandTriggerProps || {}
            setOverlay({
              ...isOverlay,
              ...defaultOverlay,
              language: !expanded,
            })
          }}
          label="Language"
          list={fetchLanguage}
          onUpdate={({ languageList }) => {
            setFetchLanguage(languageList)
          }}
        />
        <Widget.TimeLine
          list={fetchTimeLine}
          label="TimeLine"
          onUpdate={({ timeLineList }) => {
            setFetchTimeLine(timeLineList)
          }}
          isOpen={isOverlay.timeLine}
          expandTrigger={expandTriggerProps => {
            const { expanded } = expandTriggerProps || {}
            setOverlay({
              ...isOverlay,
              ...defaultOverlay,
              timeLine: !expanded,
            })
          }}
        />
        {(isOverlay.mediaType ||
          isOverlay.location ||
          isOverlay.language ||
          isOverlay.timeLine) && (
          <SearchOverlay
            onClick={() => {
              setOverlay({ ...defaultOverlay })
            }}
          />
        )}
      </SearchDropdownWrapper>
    </>
  )
}

export { SearchAccordion }
export default SearchAccordion
