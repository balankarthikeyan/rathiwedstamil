import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import * as IconGallery from '@iconsGallery'
import * as Template from '@template'
import * as Adm from '@adm'
import * as Utils from '@utils'
import { IconTextButton, MainWrapper } from './styles'
import {
  IconKit,
  SearchRadioList,
  SearchSimpleSearch,
  SearchSubmit,
} from './renderProps'

function SearchPanel(props) {
  const {
    searchType,
    setSearchType,
    isSearchMax,
    setSearchMax,
    searchSimpleContent,
    setSearchSimpleContent,
    searchTextBoxRef,
    searchChipParentBoxRef,
    renderChildren = () => {},
  } = props || {}

  const [radioActiveIndex, setRadioActiveIndex] = React.useState(0)

  const stateProps = {
    searchType,
    renderChildren,
    radioActiveIndex,
    setRadioActiveIndex,
    ...props,
  }

  return (
    <MainWrapper>
      <Grid
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          style={{
            fontWeight: 'bold',
            fontSize: '40px',
            margin: '0',
            padding: '0',
          }}
        >
          Search
        </Typography>
        <IconKit />
      </Grid>
      <SearchRadioList {...stateProps} />
      {searchType === 0 && <Template.SimpleSearch {...stateProps} />}
      {searchType === 1 && (
        <Template.AdvancedSearch
          onClickTrigger={() => {
            setRadioActiveIndex(2)
            setSearchType(2)
            console.log('clicked!!!')
          }}
          {...stateProps}
        />
      )}
      {searchType === 2 && <Template.SimpleSearch {...stateProps} />}
    </MainWrapper>
  )
}

export { SearchPanel }
export default SearchPanel
