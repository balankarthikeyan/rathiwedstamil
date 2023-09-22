import * as React from 'react'
import Link from 'next/link'
import { Grid, Typography } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import * as Template from '@template'
import styled from 'styled-components'
import axios from 'axios'
import * as Utils from '@utils'
import * as Adm from '@adm'
import * as GlobalFixture from '@fixture'
import Router from 'next/router'
import { Container } from '@material-ui/core'
import * as GlobalStates from '@states'
import * as Api from '@api'
const { endPoints = {} } = Api || {}
const { useSearchPageState = {} } = GlobalStates || {}

const {
  transformSearchChip = () => '',
  transformModalSearch = () => '',
  transformModalQuery = () => '',
  SearchBodyJson = () => '',
} = GlobalFixture

function Search(props) {
  const {
    media = [],
    social = [],
    location = [],
    language = [],
    timeLine = [],
  } = GlobalFixture
  const searchStateProps = useSearchPageState()
  const {
    alertMessage,
    isLoader,
    setAlertMessage,
    searchType,
  } = searchStateProps

  const stateProps = {
    ...searchStateProps,
  }

  return (
    <Container style={{ padding: '0', minHeight: '80vh' }} maxWidth={false}>
      <Helmet title={`Search`} />
      <Adm.Toaster
        {...alertMessage}
        autoCloseTrigger={() => {
          setAlertMessage({ open: false })
        }}
      />
      <Adm.BackdropOverlay open={isLoader} />
      <Template.SearchPanel
        renderChildren={() => (
          <>
            <Template.SearchAccordion {...stateProps} />
            {(searchType === 1 || searchType === 2) && (
              <Template.SearchTab {...stateProps} />
            )}
          </>
        )}
        {...stateProps}
      />
      <Template.SearchResult {...stateProps} />
    </Container>
  )
}

export { Search }
export default Search
