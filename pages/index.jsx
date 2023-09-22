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

function Login(props) {
  const [cookies, setCookie] = useCookies(['userId'])
  // const { axiosApiData, doGetAxios = () => '' } = Utils.useAxios() || {}
  // const APIProviderUrl = 'https://countriesnow.space/api/v0.1/countries/iso'

  React.useEffect(async () => {
    // await doGetAxios({ url: APIProviderUrl })
    const {
      userId = '',
      isRememeberMe = 'false',
      logout = 'false',
      AppServiceAuthSession = '',
    } = cookies || {}

    if (logout === 'true' && AppServiceAuthSession.length > 0) {
      // console.log('logout>>>> reload!!!!')
    }
    if (!Utils.JSUtils.isEmpty(userId) && isRememeberMe === 'true') {
      Router.push('/myworkspace')
    }
  }, [])

  // React.useEffect(async () => {
  //   console.log('fetchListData', axiosApiData)
  // }, [axiosApiData])

  return (
    <main>
      <Helmet title={`Login`} />
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
          <Template.LoginLeftPanel />
        </Grid>
        <RightPanelWrapper>
          <Template.LoginRightPanel />
        </RightPanelWrapper>
      </Grid>
    </main>
  )
}

export { Login }
export default Login

/* 
      <Helmet title={`Login`} />
        <Link href={{ pathname: '/about', query: { name: 'test' } }}>
          <a>Go to About Me</a>
        </Link>
    */
