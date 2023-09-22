import React from 'react'
import * as Adm from '@adm'
import { FormKit as LoginForm } from '@formKit'
import * as StyledDOM from './styles'
import { defaultFormList } from './fixture'
import Router from 'next/router'
import * as Utils from '@utils'
import { useCookies } from 'react-cookie'

const res = [
  {
    access_token:
      'eyJ0eXAiOiJKV1QiLCJub25jZSI6Ii1zNkFfM05DSDVlUTEtMlkyM2hJZ01HNGY0LWdqLW1VY245VDBUYWFUdkEiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8zZmMxMDBiNy02NmIyLTQwOTktYTU5MS0xMGEwN2JhNGFjZWEvIiwiaWF0IjoxNjIzNjU5OTEwLCJuYmYiOjE2MjM2NTk5MTAsImV4cCI6MTYyMzY2MzgxMCwiYWNjdCI6MSwiYWNyIjoiMSIsImFjcnMiOlsidXJuOnVzZXI6cmVnaXN0ZXJzZWN1cml0eWluZm8iLCJ1cm46bWljcm9zb2Z0OnJlcTEiLCJ1cm46bWljcm9zb2Z0OnJlcTIiLCJ1cm46bWljcm9zb2Z0OnJlcTMiLCJjMSIsImMyIiwiYzMiLCJjNCIsImM1IiwiYzYiLCJjNyIsImM4IiwiYzkiLCJjMTAiLCJjMTEiLCJjMTIiLCJjMTMiLCJjMTQiLCJjMTUiLCJjMTYiLCJjMTciLCJjMTgiLCJjMTkiLCJjMjAiLCJjMjEiLCJjMjIiLCJjMjMiLCJjMjQiLCJjMjUiXSwiYWlvIjoiQVVRQXUvOFRBQUFBOHplaHhHeTJXSnhhbnZVU0ZUQzRFQ09JWVQ3YmFDMlA0VTNDRGE3RE1maWRjUnVBQTRzK0NRSUFFNU9rVXgveWdEK1R3WXdxZW1weEgrdVBwc3Z6VVE9PSIsImFsdHNlY2lkIjoiNTo6MTAwMzIwMDExRkE4OEU0OCIsImFtciI6WyJwd2QiXSwiYXBwX2Rpc3BsYXluYW1lIjoiV2ViQXBwUG1tdC1SZWdpc3RyYXRpb24iLCJhcHBpZCI6ImExMDdjYzBiLTllZjktNGQ1ZS1iNWFhLTRiZmVkZmM5ZTUxYiIsImFwcGlkYWNyIjoiMSIsImVtYWlsIjoia2FydGhpa2V5YW4uYmFsYW5AaW5mb3Zpc2lvbi5jb20iLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9iYTUwMjhlYS0yZjg4LTQyOTgtYmJhNS1jZWNmOTUzNDJhNzUvIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMTAzLjk5LjE1MC4yMDIiLCJuYW1lIjoiS2FydGhpa2V5YW4gQmFsYW4iLCJvaWQiOiI0NzIwNjVkYi0xM2ZmLTRmNjctYjIxYS0wMzIwZDg0ZmZmMDUiLCJwbGF0ZiI6IjUiLCJwdWlkIjoiMTAwMzIwMDE0REZENzdBNSIsInJoIjoiMC5BU2dBdHdEQlA3Sm1tVUNsa1JDZ2U2U3M2Z3ZNQjZINW5sNU50YXBMX3RfSjVSc29BTmsuIiwic2NwIjoiZW1haWwgb3BlbmlkIHByb2ZpbGUiLCJzdWIiOiJqQkEwS0lUblI1N0Jma0FjN3N5RDM1X2hObWp3U2xhejZvOTFHcVRNZmVzIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6Ik5BIiwidGlkIjoiM2ZjMTAwYjctNjZiMi00MDk5LWE1OTEtMTBhMDdiYTRhY2VhIiwidW5pcXVlX25hbWUiOiJrYXJ0aGlrZXlhbi5iYWxhbkBpbmZvdmlzaW9uLmNvbSIsInV0aSI6IjFMak9QbE9rakVhTzJXWUZLOUFUQVEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjEzYmQxYzcyLTZmNGEtNGRjZi05ODVmLTE4ZDNiODBmMjA4YSJdLCJ4bXNfc3QiOnsic3ViIjoiSXJIQkNLZlpXUThOWXVWNXJsb3pQX2E2bTNuMTZhd3dBWEluaWlGRFJhQSJ9LCJ4bXNfdGNkdCI6MTU0NTA5MzUzM30.GfFTLz7bFzMoPyx_iaggCC7f7Rd3OYwJWOydGfMDAQ1seN6sbhs-qeUIcr9gQybCqI16RMYNzrzqvarDl7wwViJVrY36hrf7gVGUd7bQil0fQM7SNaFdGVN7invUKwpiDgzF3_-aRZc0UAyghc97_9cTJI3g2n-xsKLKHr-YK62Spey4HTByo9raOB8fOcZR6gdfDa5JUAAutRn09A0MCW93pViCGLxOhJzRDlPTcLdfozf1fLu08KGgjPuZlZT8wql2fxYs0HtEgShoHE1e2AY3XeDgtZ7gY2YMSAQesMhutnxHMdFpZN12c26o_ieA0Fl_LNyfDKcsE_2n7JnibA',
    expires_on: '2021-06-14T09:43:29.6423048Z',
    id_token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJhMTA3Y2MwYi05ZWY5LTRkNWUtYjVhYS00YmZlZGZjOWU1MWIiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vM2ZjMTAwYjctNjZiMi00MDk5LWE1OTEtMTBhMDdiYTRhY2VhL3YyLjAiLCJpYXQiOjE2MjM2NTk5MTAsIm5iZiI6MTYyMzY1OTkxMCwiZXhwIjoxNjIzNjYzODEwLCJhaW8iOiJBVVFBdS84VEFBQUE5TmltakZmRGxHKzUvaDNMaC9mY0VNOEZ0dzdVc0xzSzFrWldOUlhwYktmUGFyZk9UaHJtcDBzZTNzRTB2RjhvcHVtWjkxVG5jQjl6YlNmc3UxSHI2UT09IiwiZW1haWwiOiJrYXJ0aGlrZXlhbi5iYWxhbkBpbmZvdmlzaW9uLmNvbSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2JhNTAyOGVhLTJmODgtNDI5OC1iYmE1LWNlY2Y5NTM0MmE3NS8iLCJuYW1lIjoiS2FydGhpa2V5YW4gQmFsYW4iLCJub25jZSI6IjE3NTZhMTRjZTBkODQzMmFhZDBiODRkMzJhYzAwMGZhXzIwMjEwNjE0MDg0ODIxIiwib2lkIjoiNDcyMDY1ZGItMTNmZi00ZjY3LWIyMWEtMDMyMGQ4NGZmZjA1IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiS2FydGhpa2V5YW4uQmFsYW5AaW5mb3Zpc2lvbi5jb20iLCJyaCI6IjAuQVNnQXR3REJQN0ptbVVDbGtSQ2dlNlNzNmd2TUI2SDVubDVOdGFwTF90X0o1UnNvQU5rLiIsInN1YiI6IklySEJDS2ZaV1E4Tll1VjVybG96UF9hNm0zbjE2YXd3QVhJbmlpRkRSYUEiLCJ0aWQiOiIzZmMxMDBiNy02NmIyLTQwOTktYTU5MS0xMGEwN2JhNGFjZWEiLCJ1dGkiOiIxTGpPUGxPa2pFYU8yV1lGSzlBVEFRIiwidmVyIjoiMi4wIn0.FCwkB9GkwaxJUIt9cih_GDdrWUTiFZ4MYlTaoQkwXukRCtP0aves0aPoZaiC61n5vb2bK4RZbOoUFF3Gwqig1Q8lZIll9FNmR82B7ku1K5dBFFHKLm4MV5X9qXJ26lMguk5UUUIoG4_7ghXruac9GvWjI48U8ERUDsRdnptigBBU3wIQHGPPzYflzfq-LEbJDE4v7anZ8urw0BytKECDbMumhrD89xmiVJrNUtgtNbZnB-hgQJ0tk57dvcn8eAw1lHgAeDjEtjc_VrDKuDi-0Awq1AEzmkwwJIWiIL8yQccjQle2ngkK9s5Ie5s9USODJCxKj8nKbKIbnSCyvvU7nQ',
    provider_name: 'aad',
    user_claims: [
      { typ: 'aud', val: 'a107cc0b-9ef9-4d5e-b5aa-4bfedfc9e51b' },
      {
        typ: 'iss',
        val:
          'https://login.microsoftonline.com/3fc100b7-66b2-4099-a591-10a07ba4acea/v2.0',
      },
      { typ: 'iat', val: '1623659909' },
      { typ: 'nbf', val: '1623659909' },
      { typ: 'exp', val: '1623663809' },
      {
        typ: 'aio',
        val:
          'AUQAu/8TAAAA2ZuTxIrzNP6fsjw4tZo4UsXwjCZYNY6VwNdFPQR589AU6I4c19kCsUXSvzOFuucAtVVRvnI8lcOEI4mwONL0Gg==',
      },
      { typ: 'c_hash', val: '8_e1cFcmTE04r1Stk0hp4w' },
      {
        typ:
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
        val: 'karthikeyan.balan@infovision.com',
      },
      {
        typ: 'http://schemas.microsoft.com/identity/claims/identityprovider',
        val: 'https://sts.windows.net/ba5028ea-2f88-4298-bba5-cecf95342a75/',
      },
      { typ: 'name', val: 'Karthikeyan Balan' },
      { typ: 'nonce', val: '1756a14ce0d8432aad0b84d32ac000fa_20210614084821' },
      {
        typ: 'http://schemas.microsoft.com/identity/claims/objectidentifier',
        val: '472065db-13ff-4f67-b21a-0320d84fff05',
      },
      { typ: 'preferred_username', val: 'Karthikeyan.Balan@infovision.com' },
      {
        typ: 'rh',
        val: '0.ASgAtwDBP7JmmUClkRCge6Ss6gvMB6H5nl5NtapL_t_J5RsoANk.',
      },
      {
        typ:
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
        val: 'IrHBCKfZWQ8NYuV5rlozP_a6m3n16awwAXIniiFDRaA',
      },
      {
        typ: 'http://schemas.microsoft.com/identity/claims/tenantid',
        val: '3fc100b7-66b2-4099-a591-10a07ba4acea',
      },
      { typ: 'uti', val: '_0VLpVYlXEm1xXITC4gXAA' },
      { typ: 'ver', val: '2.0' },
    ],
    user_id: 'karthikeyan.balan@infovision.com',
  },
]

const LoginHeadings = () => {
  const typographyConfig = {
    title: `Login`,
    subTitle: `Login to your infovision workspace`,
  }
  return (
    <>
      <StyledDOM.LoginTitle variant="h1">
        {typographyConfig.title}
      </StyledDOM.LoginTitle>
      <StyledDOM.LoginSubTitle variant="h2">
        {typographyConfig.subTitle}
      </StyledDOM.LoginSubTitle>
    </>
  )
}

const defaultRenderSubmitButton = ({ isLoading }) => {
  const savebuttonAttrs = {
    variant: 'contained',
    type: 'submit',
    color: 'primary',
  }
  return (
    <StyledDOM.LoginButton {...savebuttonAttrs}>
      {isLoading ? 'Loading...' : 'LOGIN'}
    </StyledDOM.LoginButton>
  )
}

function LoginLeftPanel() {
  const [cookies, setCookie] = useCookies(['userId'])
  const [isLoading, setLoading] = React.useState(false)
  const { axiosApiData, doGetAxios = () => '' } = Utils.useAxios() || {}

  React.useEffect(() => {
    const { userId = '', isRememeberMe = 'false' } = cookies || {}

    // if (!Utils.JSUtils.isEmpty(userId) && isRememeberMe === 'true') {
    //   Router.push('/myworkspace')
    // }
  }, [])
  const customOnSubmit = async props => {
    const { rememeberMe = false, password = '' } = props || {}
    if (password === 'john@123') {
      const { host = '' } = location || {}
      let api = []
      const APIProviderUrl = host.includes('local')
        ? `https://webapppmmt.azurewebsites.net/.auth/me`
        : `https://${host}/.auth/me`

      const isLocal = host.includes('local')

      if (isLocal === false) {
        const { data = [] } = await doGetAxios({ url: APIProviderUrl })
        api = data
      }

      const [apiFirst = {}] = api || []
      const { user_claims = [] } = apiFirst || {}
      const [userName = {}] = user_claims.filter(item => item.typ === 'name')
      const { val: getUserName = 'John' } = userName || {}
      setCookie('isRememeberMe', rememeberMe ? 'true' : 'false', {
        path: '/',
      })
      setCookie('userId', getUserName, { path: '/' })
      setLoading(true)
      const doLoginSignIn = () => {
        Router.push('/myworkspace')
        return function() {
          setLoading(false)
        }
      }
      setTimeout(doLoginSignIn(), 500)
    }
  }

  const formAttr = {
    formList: defaultFormList,
    onChangeForm: () => {},
    onSubmit: customOnSubmit,
    renderSubmitButton: renderSubmitButtonProps =>
      defaultRenderSubmitButton({
        ...renderSubmitButtonProps,
        isLoading,
        setLoading,
      }),
  }

  return (
    <StyledDOM.LoginMainWrapper>
      <Adm.CustomLogo />
      <LoginHeadings />
      <LoginForm {...formAttr} />
      <StyledDOM.SubFooterWrapper>
        <Adm.Link label="Contact Us" href="/contactus" />
        <span>|</span>
        <Adm.Link label="Terms and Conditions" href="/terms" />
        <StyledDOM.CopyText>©2021 InfoVision</StyledDOM.CopyText>
      </StyledDOM.SubFooterWrapper>
    </StyledDOM.LoginMainWrapper>
  )
}

export { LoginLeftPanel }
export default LoginLeftPanel
