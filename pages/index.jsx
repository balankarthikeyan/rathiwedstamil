import * as React from 'react'
import Link from 'next/link'
import { Grid, Typography } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import * as Template from '@template'
import styled from 'styled-components'
import axios from 'axios'
import * as Utils from '@utils'
import Router from 'next/router'
import { useCookies } from 'react-cookie'

const RightPanelWrapper = styled(Grid)`
  width: 50%;
  height: 100vh;
  background-color: #3d52c9;
  background-image: url(/static/img_shape_login.png);
  background-position: center bottom;
  background-size: 100%;
  background-repeat: no-repeat;
  display: flex;
`

function Home(props) {
  const [cookies, setCookie] = useCookies(['userId'])

  return (
    <main>
      <Helmet title={`TEST`} />
      <Grid
        style={{
          display: 'flex',
          margin: 'auto',
          width: '100%',
          maxWidth: '1920px',
        }}
      >
        <Grid
          style={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {`TEST`}
        </Grid>
        <Link href={{ pathname: '/contactus', query: { name: 'test' } }}>
          <a>Go to contact us Me</a>
        </Link>
      </Grid>
    </main>
  )
}

export { Home }
export default Home

/* 
      <Helmet title={`Login`} />
        <Link href={{ pathname: '/about', query: { name: 'test' } }}>
          <a>Go to About Me</a>
        </Link>
    */
